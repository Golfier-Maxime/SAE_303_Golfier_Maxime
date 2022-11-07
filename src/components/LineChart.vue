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
    width: { type: Number, default: 500 }, // Hauteur du graphe
    height: { type: Number, default: 400 }, // Largeur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données injectées dans le graphique
let chartData = reactive({
    // Etiquettes l'axe 
    labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    // Valeurs des données du graphique
    // 3 datasets, en un premier temps les données sont statiques (jeux de test)
    // Elles seront écrasées par les données réelles provenant de l'API
    datasets: [
        {
            // Etiquette du jeu de données à projeter
            label: 'Femmes',
            // Valeurs des données (statiques pour l'exemple)
            data: [1252, 1351, 1439, 1324, 1362, 1180, 1319, 1176, 1130, 1270, 1018, 1037, 1033],
            borderColor: '#A73636',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Hommes',
            // Valeurs des données (statiques pour l'exemple)
            data: [4030, 3890, 3960, 3753, 3698, 3408, 3586, 3373, 3221, 3449, 3696, 3637, 3795],
            borderColor: '#3A7BAB',
            tension: 0.5,
            fill: true
        },
        {
            // Etiquette du jeu de données à projeter
            label: 'Tous',
            // Valeurs des données (statiques pour l'exemple)
            data: [5282, 5241, 5399, 5077, 5060, 4588, 4905, 4549, 4351, 4719, 4714, 4674, 4828],
            borderColor: '#65AB3A',
            tension: 0.5,
            fill: true
        }
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
            text: 'Université BFC - inscriptions :',
            // Police du texte
            font: {
                size: 16
            }
        }
    }

});


// Montage du composant Chargement des données
// Liste contiendra le résultat de la requê
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