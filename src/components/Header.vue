<script setup lang="ts">
import { ref } from "vue";
const menuVisible = ref(true);
</script>
<template>
    <nav class="">
        <div class=" bg-Blue-Black-0 flex justify-between">
            <div class="">
                <router-link to="/">
                    <div class="flex gap-2 items-center">
                        <img src="../assets/logo.svg" alt="logo" class="w-12 mt-2 mb-2 ml-4">
                        <h1 class="text-white josefin text-[28px] ">Data•Museum</h1>
                    </div>
                </router-link>
            </div>
            <div class="text-white lg:flex gap-8 font-montserrat text-2xl font-bold items-center hidden">
                <div class=" hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/">
                        <p class="">Accueil</p>
                    </router-link>
                </div>
                <div class=" hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/graph1">
                        <p>Article 1</p>
                    </router-link>
                </div>
                <div class=" hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/graph2">
                        <p>Article 2</p>
                    </router-link>
                </div>
                <div class=" hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/graph3">
                        <p>Article 3</p>
                    </router-link>
                </div>
                <div class=" hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/graph4">
                        <p>Article 4</p>
                    </router-link>
                </div>
                <div class="mr-[45px]  hover:underline underline-offset-8 decoration-Blue-Light-0 ">
                    <router-link to="/map">
                        <p>Carte</p>
                    </router-link>
                </div>

                <!-- Bouton menu -->

            </div>
            <!-- Menu mobile -->
            <div class="flex items-center lg:hidden">
                <button @click="menuVisible = !menuVisible" class="py-5 px-2">
                    <img src="../assets/menu.svg" alt="menu" class="" />
                </button>
            </div>

        </div>
        <div class="bg-Blue-Black-0 font-bold text-white lg:hidden pl-10" :class="{ hidden: menuVisible }">
            <RouterLink class="font-montserrat  block py-2 px-4" to="/">Accueil</RouterLink>
            <RouterLink class=" font-montserrat block py-2 px-4" to="/graph1">Article 1</RouterLink>
            <RouterLink class=" font-montserrat block py-2 px-4" to="/graph2">Article 2</RouterLink>
            <RouterLink class=" font-montserrat block py-2 px-4" to="/graph3">Article 3</RouterLink>
            <RouterLink class=" font-montserrat block py-2 px-4" to="/graph4">Article 4</RouterLink>
            <RouterLink class="font-montserrat block py-2 px-4" to="/map">Carte</RouterLink>

        </div>

    </nav>

</template>
<style>
.josefin {
    font-family: josefin-sans, sans-serif;
    font-weight: 700;
    font-style: normal;
}
</style>