<script setup>
</script>

<template>
  <div class="bg-[url('@/assets/museum.png')] flex flex-col">
    <!-- <img src="../assets/museum.png" alt="" class=""> -->
    <p class="font-montserrat text-[24px] text-white  ml-2 font-bold lg:text-[60px]  text-center">Analyser les
      musées avec
    </p>
    <p class="font-montserrat text-[24px] text-white  ml-2 font-bold lg:text-[60px]  text-center">Data-Museum.</p>
  </div>
  <div class="flex flex-col items-center lg:flex lg:flex-row">
    <!-- Article 1 -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2 w-72">
      <div class="flex flex-col ">
        <img src="@/assets/musee1.jpg" class=" rounded-t-md ">
        <h3 class="font-montserrat font-medium text-center">Les musées dans la Bougogne-Franche-Comté</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/graph1">Analyser</RouterLink>
        </button>
      </div>
    </article>
    <!-- Article 2 -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2  w-72">
      <div class="flex flex-col ">
        <img src="@/assets/visite.jpg" class=" rounded-t-md">
        <h3 class="font-montserrat font-medium text-center">Les visites de musées dans la Bougogne-Franche-Comté</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/graph2">Analyser</RouterLink>
        </button>
      </div>
    </article>
    <!-- Article 3 -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2  w-72">
      <div class="flex flex-col ">
        <img src="@/assets/france.jpg" class=" rounded-t-md">
        <h3 class="font-montserrat font-medium text-center">Le nombre de musée par régions</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/graph3">Analyser</RouterLink>
        </button>
      </div>
    </article>
    <!-- Article 4 -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2  w-72">
      <div class="flex flex-col ">
        <img src="@/assets/filtre.jpg" class=" rounded-t-md">
        <h3 class="font-montserrat font-medium text-center">Liste des musées en France avec Filtre</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/graph4">Analyser</RouterLink>
        </button>
      </div>
    </article>
    <!-- Article 5 -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2  w-72">
      <div class="flex flex-col ">
        <img src="@/assets/musee5.jpg" class=" rounded-t-md  w-72">
        <h3 class="font-montserrat font-medium text-center">Nombre de musée par ans</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/graph5">Analyser</RouterLink>
        </button>
      </div>
    </article>
    <!-- Map -->
    <article class="mt-12  shadow-lg  ml-2 mr-2 rounded-md pb-2  w-72">
      <div class="flex flex-col ">
        <img src="@/assets/france2.jpg" class=" rounded-t-md">
        <h3 class="font-montserrat font-medium text-center">Découvrir où sont les musées</h3>
        <button class="bg-Blue-Light-0 m-auto px-1 rounded-md text-white font-montserrat block font-semibold">
          <RouterLink to="/map">Découvrir</RouterLink>
        </button>
      </div>
    </article>
  </div>
  <div class="flex-">
    <div class="mx-2 mt-4">
      <h2 class="font-montserrat font-semibold text-center">Conclusion</h2>
      <p class="font-montserrat  mt-3 text-center lg:mx-56 mx-0">Le but de ces analyse est de ce rendre compte de
        l'importance
        des
        musées en
        france.
        Surtout on remarque l'importance des régions plus peuplées et développées dans le domaine des musées et leurs
        visiteurs.
      </p>
    </div>
  </div>
</template>

<style scoped>
.img_taille {
  width: 400px;
  height: 150px;
}
</style>