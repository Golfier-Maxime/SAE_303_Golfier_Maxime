<script setup>
import AreaView from '../components/Area.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="ml-2 mr-2 mt-12  lg:w-[1000px] lg:flex lg:gap-3">
            <div class="flex flex-col">
                <h2 class="font-montserrat font-medium text-center">Nombre de musée par ans
                </h2>
                <legend class="font-montserrat font-light text-center">(Il y a beaucoup de donnée, c'est long à charger)
                </legend>
                <AreaView class="lg:w-[600px]"></AreaView>
            </div>
            <div class="">
                <h2 class="font-montserrat font-medium text-center">
                    Une répétition au fils des années.
                </h2>
                <p class="font-montserrat  mt-3">Cela nous saute au yeux,
                    mais on remarque bien qu'une année sur deux le nombre de musée et presque
                    identique.
                </p>
                <p class="font-montserrat  mt-3">Ceci et due à cause des évement qui ce déroule tout les 2 ans et la
                    moyenne
                    de temps d'une gallerie d'un musée.
                </p>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>
