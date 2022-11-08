<script setup>
import BarchartView from '../components/BarChart.vue';
import DaughnutView from '../components/DoughnutChart.vue';
import LineView from '../components/LineChart.vue';


</script>

<template>
  <div class="bg-[url('@/assets/museum.png')] flex flex-col">
    <!-- <img src="../assets/museum.png" alt="" class=""> -->
    <p class="font-montserrat text-[24px] text-white  ml-2 font-bold lg:text-[60px]  text-center">Analyser les
      musées avec
    </p>
    <p class="font-montserrat text-[24px] text-white  ml-2 font-bold lg:text-[60px]  text-center">Data-Museum.</p>
  </div>
  <!-- Article 1 -->
  <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2">
    <div class="flex flex-col ">
      <img src="@/assets/musee1.jpg" class="img_taille rounded-t-md">
      <h3 class="font-montserrat font-medium text-center">Les musées dans la Bougogne-Franche-Comté</h3>
      <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
        <RouterLink to="/graph1">Analyser</RouterLink>
      </button>
    </div>
  </article>
  <!-- Article 2 -->
  <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2">
    <div class="flex flex-col ">
      <img src="@/assets/visite.jpg" class="img_taille rounded-t-md">
      <h3 class="font-montserrat font-medium text-center">Les visites de musées dans la Bougogne-Franche-Comté</h3>
      <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
        <RouterLink to="/graph2">Analyser</RouterLink>
      </button>
    </div>
  </article>
  <!-- Article 3 -->
  <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2">
    <div class="flex flex-col ">
      <img src="@/assets/france.jpg" class="img_taille rounded-t-md">
      <h3 class="font-montserrat font-medium text-center">Le nombre de musée par régions</h3>
      <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
        <RouterLink to="/graph3">Analyser</RouterLink>
      </button>
    </div>
  </article>
  <!-- Article 4 -->
  <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2">
    <div class="flex flex-col ">
      <img src="@/assets/filtre.jpg" class="img_taille rounded-t-md">
      <h3 class="font-montserrat font-medium text-center">Liste des musées en France avec Filtre</h3>
      <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
        <RouterLink to="/graph4">Analyser</RouterLink>
      </button>
    </div>
  </article>
  <!-- Article 5 -->
  <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2">
    <div class="flex flex-col ">
      <img src="@/assets/filtre.jpg" class="img_taille rounded-t-md">
      <h3 class="font-montserrat font-medium text-center">Liste des musées en France avec Filtre</h3>
      <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
        <RouterLink to="/graph4">Découvrir</RouterLink>
      </button>
    </div>
  </article>
</template>

<style scoped>
.img_taille {
  width: 400px;
  height: 150px;
}
</style>