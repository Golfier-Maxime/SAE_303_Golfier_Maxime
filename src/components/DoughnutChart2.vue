<script setup>
// Import des éléments utiles de vue
import { reactive, ref, onMounted } from 'vue';

// Import d'un graphique type doughnut
import { Doughnut } from 'vue-chartjs'

// Import des objets du graphique de la bibliothèque ChartJs
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

// Eléments utilisés potentiellement pour notre graphique
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


// Propriétés du graphique Utilisés dans le template (props)
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de types, voire des objets
const propChart = defineProps({
    chartId: { type: String, default: 'doughnut-chart' }, // Id du graphique
    datasetIdKey: { type: String, default: 'label' }, // id du dataSet
    width: { type: Number, default: 500 }, // Largeur du graphe
    height: { type: Number, default: 500 }, // Hauteur du graphe
    cssClasses: { type: String, default: '' }, // Classes css utilisées
    styles: { type: Object, default: () => { } }, // Styles utilisés
    plugins: { type: Object, default: () => { } }  // plugins utilisés
})

// Données du graphe
// Pour l'instant juste pour tester le fonctionnement
const chartData = reactive({
    // Les éléments sont au départ à vide
    labels: ['Partie Rectiligne', 'En courbe (Virages)', 'En "S"', 'Autres'],
    datasets: [
        {
            data: [51524, 7737, 622, 6098],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1
        }
    ]
})

// Options du graphe
const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false
})


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
        <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
            :height="height" />
    </div>
</template>

    