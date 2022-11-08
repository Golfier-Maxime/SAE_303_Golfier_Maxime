<script setup>
import PiechartView from '../components/PieChart.vue';
</script>

<template>
    <div class="ml-2 mr-2 mt-12">
        <div class="flex flex-col">
            <h2 class="font-montserrat font-medium text-center">Nombre de musée par régions
            </h2>
            <PiechartView></PiechartView>
        </div>
        <div class="">
            <h2 class="font-montserrat font-medium text-center">
                Une dominance des régions plus dévoloppé.
            </h2>
            <p class="font-montserrat  mt-3">Avec le Covid,
                beaucoup de musée on fermé. Ce qui par logique a entrainé une chute drastique des visites dans les
                musées.
            </p>
            <p class="font-montserrat  mt-3">Aussi on peux voir que plus la régions est devoloppé plus le nombre de
                musée
                est important.
            </p>
        </div>

    </div>
</template>

<style scoped>

</style>
