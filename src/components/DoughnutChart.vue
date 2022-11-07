<script setup>
//imoport element vue
import { reactive, ref, onMounted } from "vue";
// import type graphique de bar
import { Doughnut } from "vue-chartjs";

//import des objet graphique de la biblioteque chartjs
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
//importelement utilisé dans le graphique
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
//proprieter du graphique use dans le template
//On définipour chacune son type de donné et ça valeur par défaut
//On peux utilisé une grande varieté de type,voire des objet

const propChart = defineProps({
  chartId: { type: String, default: "doughnut-chart" }, //Id du graphique
  datasetIdKey: { type: String, default: "label" }, //Id du dataset
  width: { type: Number, default: 500 }, //largeur du graph
  height: { type: Number, default: 500 }, //Hauteur du graph
  cssClasses: { type: String, default: "" }, //class css use
  styles: { type: Object, default: () => { } }, //class css use
  plugins: { type: Object, default: () => { } }, // plugin use
});

// données injecte dans le graphique
const chartData = reactive({
  // etiquete de l'axe
  labels: [],
  // valeur des donnée du graphique
  datasets: [
    {
      // valeur des donnée
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ],
});

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
  await fetch("https://jsongaulois.jmfino.fr/listeVillageois.php")
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
  <div class="container">
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
  </div>
</template>

<style scoped>

</style>