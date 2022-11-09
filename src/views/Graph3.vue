<script setup>
import PiechartView from '../components/PieChart.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="ml-2 mr-2 mt-12  lg:w-[1000px] lg:flex lg:gap-3 ">
            <div class="flex flex-col">
                <h2 class="font-montserrat font-semibold text-center">Nombre de musée par régions
                </h2>
                <PiechartView class="lg:w-[600px] "></PiechartView>
                <p class="font-montserrat font-light text-xs text-center">Source : data.culture.gouv.fr</p>
            </div>
            <div class="mx-2 mt-4">
                <h2 class="font-montserrat font-semibold text-center">
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
    </div>
</template>

<style scoped>

</style>
