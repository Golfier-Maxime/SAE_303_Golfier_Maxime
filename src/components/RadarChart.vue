<script setup>
    import { reactive, ref, onMounted } from 'vue';

    // Import d'un graphique type radar
    import { Radar } from 'vue-chartjs'

    // Import des objets du graphique de la bibliothèque ChartJs
    // Voir documentation pour descriptif des éléments
    import { Chart as ChartJS, Title, Tooltip, Legend,  PointElement, LineElement, 
            RadialLinearScale, Filler } from 'chart.js'

    // Eléments utilisés par notre graphique registration pour Vue-chart
    ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, 
        RadialLinearScale, Filler )


    // Propriétés du graphique Utilisés dans le template (props)
    // On définit pour chacune son type de données et sa valeur par défaut
    // On peut utiliser une grande variété de types, voire des objets
    const propChart = defineProps({
        chartId:            { type: String,         default: 'radar-chart'    }, // Id du graphique
        datasetIdKey:       { type: String,         default: 'label'          }, // id du dataSet
        width:              { type: Number,         default: 100              }, // Hauteur du graphe
        height:             { type: Number,         default: 100              }, // Largeur du graphe
        cssClasses:         { type: String,         default: ''               }, // Classes css utilisées
        styles:             { type: Object,         default: () => {}         }, // Styles utilisés
        plugins:            { type: Object,         default: () => {}         }  // plugins utilisés
    })

    // Données injectées dans le graphique
    // données de tests écrassées par la suite par les données réelles
    let chartData = reactive({
        // Etiquettes l'axe 
        labels: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai' ],
        // Valeurs des données du graphique
        // 3 datasets, en un premier temps les données sont statiques (jeux de test)
        // Elles seront écrasées par les données réelles provenant de l'API
        datasets: [
            {
                // Etiquette du jeu de données à projeter
                label : 'Femmes',
                // Valeurs des données (statiques pour l'exemple)
                data: [40, 20, 12, 14, 24],
                borderColor: 'rgba(255, 0, 0, 0.5)',
                fill:true,
            },
            {
                // Etiquette du jeu de données à projeter
                label : 'hommes',
                // Valeurs des données (statiques pour l'exemple)
                data: [40, 20, 12, 14, 24],
                borderColor: 'rgba(0, 0, 255, 0.5)',
                fill:true,
            },
        ]
    });

    // Options du graphique
    // Les principales utilisées, ils en existe beaucoup d'autres
    // voir documentation
    let chartOptions = reactive({ 
        // Aspect responsive du graphique
        responsive: true,  
        maintainAspectRation:true,
        // Echelles
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
            },
        },
         // Les plugins
         plugins:{
            // Titre du graphique      
            title:{
                // Affichage
                display:true,
                // Libellé du graphique
                text : 'accidents vélos ',
                // Police du texte
                font:{
                    size:16
                }
            }
        } 
    });

    // Liste des thèmes de visualisation     
    let theme = [
        { id :  1 , lib : 'par mois' },
        { id :  2 , lib : 'par année'}, 
        { id :  3 , lib : 'par age'}
    ]

    // Théme sélectionné
    let themeSelect = ref()
    themeSelect.value = 1

    // Total des valeurs calculées
    let total = ref()
        total.value = 0

    // Initialisation de l'animation d'attente
    // au départ on a pas reçu les données donc false
    // Passe à varia à la réception de celle-ci
    let loading = ref()
    loading.value=false

    // Montage du composant Chargement des données
    // Liste contiendra le résultat de la requête
    let liste = ref()
    onMounted(async() => {
        let request = "https://accidentvelo.jmfino.fr/json.php"
        await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // récupération de la réponse
        .then(response => {
            liste.value = response
console.log("liste", liste)
console.log("nb lignes", liste.value.length)
            // Arrêt animation d'attente
            loading.value = true

            // Le 1° record contient la définition des colonnes
            // A partir du 2° les données
            // Chaque mouvement est un accident
            // Récupération des thémes - position
            // 1 date
            // 23 sexe
            // 24 age
            // 37 mois
            // Recherche année min et max pour le titre
            let anneeMax = 0
            let anneeMin = 9999
            liste.value.forEach( (el) => {
                let dt = el[1].split("-")
                if(dt[0]  < anneeMin){
                    anneeMin = dt[0]
                }   
                if(dt[0]  > anneeMax){
                    anneeMax = dt[0]
                }   
            })
            chartOptions.plugins.title.text = chartOptions.plugins.title.text+' de '+anneeMin+' à '+anneeMax

            // Par défaut par mois
            byMonth()
            // Selection forcée à 1
            themeSelect = 1
        })
        .catch(error => console.log('erreur Ajax', error))
    }) // fin onMounted


    // Suivant le thème sélectionné
    // Appel de la fonction correspondante
    const selection = (theme) => {
        switch (theme) {
            case 1 :
                byMonth()
                break
            case 2 :
                byYear()
                break
            case 3 :
                byAge()
                break
        }
    }

    // Calcul par par mois
    const byMonth = () => {
        // Récupération des mois (set)            
        let setMois     = new Set() 
        // la 1° ligne contient le descriptif
        // firstLine permet de l'éviter lors des calculs
        let firstLine = true;            
        liste.value.forEach( (el) => {
            // Si ce n'est pas la 1° ligne
            if(!firstLine){ setMois.add(el[37])  } // Ajout du nom du mois
            // Mise à faux au 1° passage et après d'ailleurs
            firstLine = false
        })
        // Chargement des labels
        // Les mois sont déjà classés
        chartData.labels = Array.from(setMois)
        let cptF        = [] // Tableau de Comptage femmes
        let cptH        = [] // Tableau de comptage hommes
        total.value     = 0  // total des valeurs
        // Boucle pour comptage
        firstLine = true;            
        chartData.labels.forEach( (mois) => {
            let nbF = 0  // Compteur femme
            let nbH = 0  // compteur hommes
            // Boucle de comptage homme/femme
            liste.value.forEach( (el) => {
                if(!firstLine){                        
                    if(mois == el[37]){
                        if(el[23] == 'F')   { nbF++ }
                        if(el[23] == 'M')   { nbH++ }
                    }
                }
            })
            // Totalisation
            total.value += nbF + nbH // Totalisation
            cptF.push(nbF)      // Ajout total femmes au tableau
            cptH.push(nbH)      // Ajout total hommes au tableau
            firstLine = false  // Mise à faux de la 1° ligne
        })
        // Chargement des données
        chartData.datasets[0].data = cptF;
        chartData.datasets[1].data = cptH;
    }

    const byYear = () => {
        // Récupération des années (set)            
        let setAnnee    = new Set() 
        let firstLine = true;            
        liste.value.forEach( (el) => {
            if(!firstLine){
                let dt = el[1].split('-') // Récupération de l'année à partir de la date
                setAnnee.add(dt[0])       // Ajout année au set
            }
            firstLine = false
        })
        // Chargement des labels
        chartData.labels = Array.from(setAnnee)
        chartData.labels.sort()  // Tri des années
        let cptF        = [] // Tableau de comptage femmes
        let cptH        = [] // Tableau de comptage hommes
        // Boucle pour comptage
        firstLine = true;            
        total.value = 0 // totalisation des mvts
        chartData.labels.forEach( (an) => {
            let nbF = 0 // compteur femmes
            let nbH = 0 // compteur hommes
            liste.value.forEach( (el) => { // boucle comptage
                if(!firstLine){                        
                    let dt = el[1].split('-')
                    if(an == dt[0]){
                        if(el[23] == 'F')   { nbF++ }
                        if(el[23] == 'M')   { nbH++ }
                }
            }
            })
            total.value += nbF + nbH  // valeur total
            cptF.push(nbF)  // Ajout total femmes au tableau
            cptH.push(nbH)  // Ajout toal hommes au tableau
            firstLine = false // pour 1° ligne
        })
        chartData.datasets[0].data = cptF; // chargement données femmes
        chartData.datasets[1].data = cptH; // Chargement données hommes
    }

    const byAge = () => {
        // Récupération des ages (set)            
        let setAge    = new Set() 
        let firstLine = true;
        // Pour enlever les mauvaises valeurs             
        // Certaines valeurs de l'age sont erronées
        // Il y a une période à la place
        let valOut = ['2004-2005', '2005-2006', '2006-2007', '2010-2011', '2012-2013', '2013-2014', '2016-2017']
        liste.value.forEach( (el) => { // Boucle pour les labels
            if(!firstLine){
                // Eloignement des mauvaises valeurs
                if(valOut.indexOf(el[24]) < 0){
                    // complement des ages pour tri
                    // ajout de 0 devant les valeurs < 10
                    let test = el[24].split("-")
                    if(test[0] < 10) { test[0] = "0"+test[0]}
                    if(test[1] < 10) { test[1] = "0"+test[1]}
                    let tr = [test[0], test[1]].join('-')
                    // On ne prend que les tranches de 10 ans à 79 ans
                    if(test[0] < 80 && test[0] > 9){
                        setAge.add(tr) 
                    }
                }
            }
            firstLine = false
        })
        chartData.labels = Array.from(setAge) // chargement des labels
        chartData.labels.sort() // tri des labels
        let cptF        = []  // Tableau de comptage femmes
        let cptH        = []  // Tableau de comptage hommes

        firstLine = true;            
        total.value=0
        chartData.labels.forEach( (age) => { // Boucle de comptage labels
            let nbF = 0 // compteur pour les femmes
            let nbH = 0 // compteur pour les hommes
            liste.value.forEach( (el) => { // boucle de comptage datas 
                if(!firstLine){                        
                   if(age == el[24]){
                        if(el[23] == 'F')   { nbF++}
                        if(el[23] == 'M')   { nbH++ }
                    }
                }
            })
            total.value += nbF + nbH // Mise à jour total
            cptF.push(nbF) // Ajout total femmes au tableau
            cptH.push(nbH) // Ajout total hommes au tableau
            firstLine = false // Mise à jour 1° ligne
        })
        chartData.datasets[0].data = cptF; // Chargement données femmes
        chartData.datasets[1].data = cptH; // Chargement données hommes        
    }
</script>

<template>
    <div class="container-fluid">
        <form>
            <div class="form-row">
                <div class="col-7">
                <select class="form-control" v-model="themeSelect" @change="selection(themeSelect)">
                    <option v-for="th in theme" :key="th.id" :value="th.id">
                        {{th.id}} - {{th.lib}}
                    </option>
                </select>
                </div>
                <div class="col-2">
                    <input class="form-control" type="text" value="total" readonly />
                </div>
                <div class="col-3">
                    <input class="form-control" type="text" :value="total" readonly />
                </div>
            </div>
        </form>
        <div v-if="loading">
            <div class="container">
            <Radar
                :chart-options="chartOptions" 
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
            />
            </div>
        </div>
        <div v-else>
            <img src ="@/assets/loading-36.gif" class="img-fluid" />
        </div>
    </div>
</template>

<style scoped>
.container{
    width:50% !important;
    height:70vh !important;
}
</style>