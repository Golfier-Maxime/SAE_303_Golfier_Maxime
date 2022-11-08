<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getVillageois, getGares, getVideos } from '@/composables/serviceAjax.js'
import { getLabels, countDatas } from '@/composables/utilsApp.js'
import { aleatoire, densite } from '@/composables/commonChart.js'
import { linearData, filterColumn, sortCol } from '@/composables/utilsTable.js'


import { PolarArea } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'

// Eléments utilisés par notre graphique
ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)


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
let chartData = reactive({
    labels: [],
    datasets: [{}]
})
const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {

        title: {
            text: null,
            display: true
        }
    }
})

let dataSelected = ref()

let modeSelected = ref()
modeSelected.value = false

let baseColor = ref()
let fields = ref()
let title = ref()
let color = ref()
let titleGraph = ref('')
let dataView = ref('')
let numDataset = ref('')
let items = ref('')
let itemsSvg = ref('')

let fieldsVillageois = ref()
fieldsVillageois.value = [
    { key: 'id', label: 'id', type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'nom', label: 'nom', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'adresse', label: 'adresse', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'laSpecialite.nom', label: 'Spécialité', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'leLieuHabitat.nom', label: 'Habitat', type: "string", sortable: true, sort: 1, filter: "" },
]
let fieldsVideos = ref()

fieldsVideos.value = [
    { key: 'id', label: 'id', type: "number", sortable: true, sort: 1, filter: "" },
    { key: 'titre', label: 'titre', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesPays.nom', label: 'Pays', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesCategories.lib', label: 'Catégories', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'lesActeurs.nom', label: 'Acteurs', type: "string", sortable: true, sort: 1, filter: "" },
]
let fieldsGares = ref()
fieldsGares.value = [
    { key: 'fields.code_ligne', label: 'Code Ligne', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.commune', label: 'Commune', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.libelle', label: 'Libellé', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.voyageurs', label: 'Voyageurs', type: "string", sortable: true, sort: 1, filter: "" },
    { key: 'fields.idreseau', label: 'Réseau', type: "number", sortable: true, sort: 1, filter: "" },
]
const selectMode = () => {
    let bgColor = null
    let bdColor = null

    if (modeSelected.value) {
        [bgColor, bdColor] = aleatoire(chartData.labels)
    } else {
        [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data)
    }
    chartData.datasets[0].backgroundColor = bgColor
    chartData.datasets[0].borderColor = bdColor
    chartData.datasets[0].borderWidth = 1
}

const selectData = async (typeData) => {
    dataSelected.value = typeData
    switch (typeData) {
        case 'villageois':
            await getVillageois()
                .then(response => {
                    items.value = response
                    titleGraph.value = "Spécialités des villageois"
                    dataView.value = 'laSpecialite.nom#1'
                    baseColor.value = 'rgba(0,0,255, #deg#)'
                    numDataset = 0
                    fields.value = fieldsVillageois.value
                    color.value = "color:blue;"
                })
            break
        case 'videos':
            await getVideos()
                .then(response => {
                    items.value = response
                    titleGraph.value = "Catégorie des videos"
                    dataView.value = 'lesCategories.lib#multi'
                    baseColor.value = 'rgba(255,0,0, #deg#)'
                    numDataset = 0
                    fields.value = fieldsVideos.value
                    color.value = "color:red;"
                })
            break
        case 'gares':
            await getGares('Doubs')
                .then(response => {
                    items.value = response.records
                    titleGraph.value = "Lignes des gares"
                    dataView.value = 'fields.code_ligne#1'
                    baseColor.value = 'rgba(0,255,0, #deg#)'
                    numDataset = 0
                    fields.value = fieldsGares.value
                    color.value = "color:green;"
                })
            break
    }
    items.value = linearData(fields.value, items.value)
    itemsSvg.value = items.value
    updateGraph(items)
}

const updateGraph = (items) => {
    chartOptions.plugins.title.text = titleGraph
    chartData.labels = getLabels(items.value, dataView.value)
    chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)
    selectMode()
    title.value = chartOptions.plugins.title.text
}

onMounted(async () => {
    await selectData('villageois')
})
const tableFilter = (field) => {
    items.value = filterColumn(field, itemsSvg.value)
    updateGraph(items)
}
</script>

<template>
    <main class="container-fluid">
        <h1 class="titre">Graphique PolarArea</h1>
        <br>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a href="#" class="navbar-brand">Selection :</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('villageois')">Villageois</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('videos')">Videos</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="selectData('gares')">Gares</a>
                </li>
            </ul>
            <form class="navbar-nav ml-auto">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="modeSelected"
                        @change="selectMode">
                    <label for="customSwitch1" class="custom-control-label">Dégradé / Aléatoire</label>
                </div>
            </form>
        </nav>
        <div class="row">
            <div class="col-4">
                <PolarArea class="fondBlanc" :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                    :width="width" :height="height" />

            </div>
            <div class="col-8">
                <TableMdl :title="title" :fields="fields" :items="items" :itemsSvg="itemsSvg" :color="color"
                    @tableFilter="tableFilter" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.fondBlanc {
    background: white;
}

.custom-control-label {
    color: #8a9da0;
}
</style>