<script setup>
import LinechartView from '../components/LineChart.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="ml-2 mr-2 mt-12  lg:w-[1000px] lg:flex lg:gap-3 ">
            <div class="flex flex-col ">
                <h2 class="font-montserrat font-semibold text-center">Nombre de visites dans les musées en
                    Bourgogne-Franche-Comté
                    par département
                </h2>
                <LinechartView class="lg:w-[600px]"></LinechartView>
                <p class="font-montserrat font-light text-xs text-center">Source : data.culture.gouv.fr</p>
            </div>
            <div class="mt-4">
                <div class="">
                    <h2 class="font-montserrat font-semibold text-center">
                        Une chute avec le Covid.
                    </h2>
                    <p class="font-montserrat  mt-3">Avec le Covid,
                        beaucoup de musée on fermé. Ce qui par logique a entrainé une chute drastique des visites dans
                        les
                        musées.
                    </p>
                    <p class="font-montserrat  mt-3">Aussi on peux voir que la plupard des visites sont faite dans les
                        lieux
                        avec
                        beaucoup de densité de population, comme la Cote-d'Or avec Dijon ou le Doubs avec Besonçon. Et
                        que
                        des départements comme
                        le Nièvre la Haute-Saone sont beaucoup moins attractive.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
