<script setup>
import { reactive, ref, onMounted } from 'vue';

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
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 450 }, // Largeur du graphe
    height: { type: Number, default: 400 }, // Hauteur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquettes l'axe 
    labels: [],
    // Valeurs des données du graphique
    datasets: [{
        // Etiquette du jeu de données à projeter
        label: [],
        // Valeurs des données (statiques pour l'exemple)
        data: [],
        // Couleur de la barra affectée à chaque valeur
        backgroundColor: [],
        // Couleur de la bordure affectée à chaque valur
        borderColor: [],
        // Epaisseur de la bordure
        borderWidth: 1
    }]
});

// Options du graphique
// Les principales utilisées, ils en existe beaucoup d'autres
// voir documentation
const chartOption = reactive({
    //aspect responsive du graphique
    responsive: true,
    // maintient du ratio
    maintainAspectRatio: false,
});
// usage d'une ref pour requete ajax
// null au départ (important)
let liste = ref(null);
// liste des spécialité
let lstSpecialite = [];
// table a nb de villagoie
let lstNb = [];
// au montage du composant
onMounted(async () => {
    await fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=&facet=region_administrative&facet=departement&refine.region_administrative=Bourgogne-Franche-Comt%C3%A9")
        // reponse demandé en json
        .then((response) => response.json())
        // recup des rep
        .then((response) => {
            liste = response;
            // on verifie dans la console l'obtention des resultats
            console.log("response", liste);

            // parcours de la liste des villageois
            // pour placer les spécialités dans un set
            // permet d'eliminer les doublon
            let setSp = new Set();
            liste.forEach((vil) => {
                setSp.add(vil.laSpecialite.nom);
            });
            console.log("setSp :", setSp);
            // recuperation des valeur du set dans un tableau
            chartData.labels = Array.from(setSp);
            // tri du tableau par ordre alphabétique
            chartData.labels.sort();
            // calcul du nombre de villageois par specialité
            let cpt = [];
            // parcours des pécialités
            chartData.labels.forEach(function (spe) {
                // initiation du nombre pour la spécialité en cours
                let nb = 0;
                // parcours de la liste des villageois
                liste.forEach((vil) => {
                    // si c'est la bonne spé
                    // on compte plus 1
                    if (spe == vil.laSpecialite.nom) {
                        nb++;
                    }
                });
                // on place le nb de villageois de cette spécialité
                // dans le tableau de comptage
                cpt.push(nb);
            });
            // on transfert le tableau de comptage dans les data
            chartData.datasets[0].data = cpt;
            // calcul des couleurs et bordure
            let bgColor = [];
            let bdColor = [];
            // pour chaque valeur existante
            cpt.forEach(function (val) {
                // on calcul la couleur du secteur
                let c1 = couleur(0, 255);
                let c2 = couleur(0, 255);
                let c3 = couleur(0, 255);
                let tr = 0.5;
                // couleur avec transparence
                let color = "rgba(" + [c1, c2, c3, tr].join(",") + ")";
                bgColor.push(color);
                //bordure sans transparence
                let border = "rgba(" + [c1, c2, c3, tr].join(",") + ")";
                bdColor.push(color);
            });
            // chargement des couleur et des bordure
            chartData.datasets[0].backgroundColor = bgColor;
            chartData.datasets[0].borderColor = bdColor;
        })
        .catch((error) => console.log("erreur ajax"));
});
//fonction de clacul aléatoire des couleurs
const couleur = (min, max) => {
    return Math.floor(Math.random() * (max - min));
};

</script>

<template>
    <div class="">
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
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    </div>

</template>