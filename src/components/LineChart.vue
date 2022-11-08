<script setup>
import { reactive, ref, onMounted } from 'vue';

// Import d'un graphique typeLineChart
import { Line } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
// Voir documentation pour descriptif des éléments
import {
    Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement,
    LineController, CategoryScale, LinearScale, Filler
} from 'chart.js'

// Eléments utilisés par notre graphique registration pour Vue-chart
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement,
    LineController, CategoryScale, LinearScale, Filler)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'line-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 200 }, // Hauteur du graphe
    height: { type: Number, default: 100 }, // Largeur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquettes l'axe 
    labels: [],
    // Valeurs des données du graphique
    // 3 datasets, en un premier temps les données sont statiques (jeux de test)
    // Elles seront écrasées par les données réelles provenant de l'API
    datasets: [
        {
            // Etiquette du jeu de données à projeter
            label: 'Cote Or',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(0, 255, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Doubs',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(255, 0, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Jura',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(0, 0, 255, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Nièvre',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(0, 127, 127, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Saoune et Loire',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(127, 127, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Téritoire de Belfort',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(127, 0, 127, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Yonne',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(127, 0, 0, 0.5)',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Haute-Saone',
            // Valeurs des données (statiques pour l'exemple)
            data: [],
            borderColor: 'rgba(0, 0, 127, 0.5)',
            tension: 0.5,
            fill: true
        },

    ]
});

// Options du graphique
// Les principales utilisées, ils en existe beaucoup d'autres
// voir documentation
let chartOptions = reactive({
    // Aspect responsive du graphique
    responsive: true,
    // Les plugins
    plugins: {
        // Titre du graphique      
        title: {
            // Affichage
            display: false,
            // Libellé du graphique
            text: 'Nombre de visites dans les musées en Bourgogne-Franche-Comté par département',
            // Police du texte
            font: {
                size: 16
            }
        }
    }

});

// Montage du composant Chargement des données
// Liste contiendra le résultat de la requête
let liste = ref()
onMounted(async () => {

    let request = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=frequentation-des-musees-de-france&q=&rows=500&facet=total&refine.regions=BOURGOGNE-FRANCHE-COMTE"

    await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // récupération de la réponse
        .then(response => {
            liste.value = new Array(response);
            // On vérifie dans la consle l'obtention des résultats
            console.log("response", liste.value);
            // Récupération du nombres de valeurs retournées
            chartOptions.plugins.title.text += liste.value[0].nhits + " réponses"
            // Chargement des labels (axe des ordonnées)
            // Création d'un set pour valeurs uniques
            let setLabels = new Set()
            // Parcours des valeurs , récupération des années
            liste.value[0].records.forEach((el) => {
                setLabels.add(el.fields.annee)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            // Calcul des valeurs par labels
            let cptCoteOr = []
            let cptDoubs = []
            let cptHS = []
            let cptJura = []
            let cptNievre = []
            let cptSL = []
            let cptTB = []
            let cptYonne = []
            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbCoteOr = 0
                let nbDoubs = 0
                let nbHS = 0
                let nbJura = 0
                let nbNievre = 0
                let nbSL = 0
                let nbTB = 0
                let nbYonne = 0
                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.annee) {
                        // Comptage des valeurs
                        if (el.fields.total && (el.fields.nomdep == "CÔTE D’OR")) {
                            nbCoteOr += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "DOUBS")) {
                            nbDoubs += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "JURA")) {
                            nbJura += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "NIÈVRE")) {
                            nbNievre += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "SAONE ET LOIRE")) {
                            nbSL += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "TERRITOIRE DE BELFORT")) {
                            nbTB += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "YONNE")) {
                            nbYonne += el.fields.total
                        }
                        if (el.fields.total && (el.fields.nomdep == "HAUTE-SAONE")) {
                            nbHS += el.fields.total
                        }


                    }
                })
                // Mise à jour des tableaux

                cptCoteOr.push(nbCoteOr)
                cptDoubs.push(nbDoubs)
                cptJura.push(nbJura)
                cptNievre.push(nbNievre)
                cptSL.push(nbSL)
                cptTB.push(nbTB)
                cptYonne.push(nbYonne)
                cptHS.push(nbHS)

            })
            // chargement des données
            chartData.datasets[0].data = cptCoteOr;
            chartData.datasets[1].data = cptDoubs;
            chartData.datasets[2].data = cptJura;
            chartData.datasets[3].data = cptNievre;
            chartData.datasets[4].data = cptSL;
            chartData.datasets[5].data = cptTB;
            chartData.datasets[6].data = cptYonne;
            chartData.datasets[7].data = cptHS;

            console.log("chartData", chartData.datasets)
        })
        .catch(error => console.log('erreur Ajax', error))
})
</script>

<template>
    <!-- 
        chart-options : Options du graphique
        chart-data : données du graphique
        chart-id : Identifiant du graphique
        dataset-id-key : Identifiant des données
        plugins : plugins utilisés
        css-classes : Classes css utilisées
        styles : styles css utilisés
        width : largeur du graphique
        height : hauteur du graphique
    -->
    <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>