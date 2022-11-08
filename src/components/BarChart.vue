<script setup>
import { reactive, onMounted, ref } from 'vue';

// Import d'un graphique type barChart
import { Bar } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Eléments utilisés par notre graphique
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'bar-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // Id du dataSet
    width: { type: Number, default: 300 }, // Hauteur du graphe
    height: { type: Number, default: 300 }, // Largeur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquette de l'axe
    labels: [],
    // Valeurs des données du graphique
    datasets: [{
        // Etiquette du je de données à projeter
        label: [],
        // Valeurs des données
        data: [],
        // Couleur des barres en regard des valeurs
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
        ],
        // Couleur de la bordure de chaque barre
        borderColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
        ],
        borderWidth: 1
    }]
})

// Options du graphique
// Les principales utilisées, ils en existe d'autres
// voir documentation
let chartOptions = reactive({
    // Aspect responsive du graphique
    responsive: true,
    // Maintien du ratio
    maintainAspectRation: false,

    // Type de projection utilisée
    // x : verticale
    // y : horizontale
    indexAxis: 'x',

    // Echelles du graphique
    scales: {
        // axe des ordonnées
        y: {
            // Valeur max des y
            suggestedMax: 30,
            ticks: {
                // Police
                font: {
                    size: 16
                }
            }
        },
        // axe des abscisses
        x: {
            ticks: {
                // Police
                font: {
                    size: 16
                }
            }
        },
    },

    // Les plugins
    plugins: {
        // Légende des données
        legend: {
            // label des données
            labels: {
                color: 'green',
                font: {
                    size: 16
                }
            }
        },
        title: {
            // Affichage du titre
            display: false,
            // Libellé du graphique
            text: "Chartjs - BarChart",
            // Couleur du texte
            color: 'blue',
            // Police du texte
            font: {
                size: 16
            }
        }
    }

})

let liste = ref()
onMounted(async () => {

    let request = "https://data.culture.gouv.fr/api/records/1.0/search/"
        + '?dataset=liste-et-localisation-des-musees-de-france'
        + '&q='
        + '&rows=100'
        + '&refine.region_administrative=Bourgogne-Franche-Comt%C3%A9'

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
                setLabels.add(el.fields.departement)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            // Calcul des valeurs par labels
            // Comptage pour les entrées payantes
            let cptp = []
            // Comptage pour les entrées gratuites

            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbp = 0

                // Parcours des valeurs
                liste.value[0].records.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.departement) {
                        // Comptage des valeurs
                        if (el.fields.departement) {
                            nbp += 1
                        }
                    }
                })
                // Mise à jour des tableaux
                cptp.push(nbp)

            })
            // chargement des données
            chartData.datasets[0].data = cptp

            console.log("chartData", chartData.datasets)
        })
        .catch(error => console.log('erreur Ajax', error))
})
</script>

<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<style scoped>

</style>