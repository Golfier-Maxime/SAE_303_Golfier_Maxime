<script setup>
import BarchartView from '../components/BarChart.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="ml-2 mr-2 mt-12  lg:w-[1000px] lg:flex lg:gap-3">
            <div class="flex flex-col">
                <h2 class="font-montserrat font-semibold text-center">Nombre de musée par département en
                    Bourgogne-Franche-Comté
                </h2>
                <BarchartView class="lg:w-[400px]"></BarchartView>
                <p class="font-montserrat font-light text-xs text-center">Source : data.culture.gouv.fr</p>
            </div>
            <div class="mt-4">
                <h2 class="font-montserrat font-semibold text-center">
                    Une centaine du musée pour la région.
                </h2>
                <p class="font-montserrat  mt-3">Comme on peux le voir, il y a environs 100 musée dans la
                    Bourgogne-Franche-Comté.
                    Ce qui semble peux pour une région comme celle-ci, on à bien évidement beaucoup de musée sur
                    l'horlogerie, l'automobile ou les lieux historiques commes les chateaux ou les lieux archéologiques.
                    Mais peux de musée sur le l'art "Classique", peinture, statue ou art visuel.
                </p>
                <p class="font-montserrat  mt-3">Aussi on peux voir que la plupard des musées sont dans les régions ou
                    il y
                    a le plus de monde, bien évidement. Mais par
                    exemple il y a peux de musée dans le térritoire de belfort car bien plus petit que les autres.
                </p>
                <h2 class="font-montserrat font-semibold text-center mt-4">
                    Pertinence du graphique.
                </h2>
                <p class="font-montserrat  mt-3"> Le graphique permet de mettre en avant le nombre de musée en BFC par
                    département.
                    Le graphique en Bar est vraiment pratique pour ce genre de visualisation de donnée, il y a pas
                    beaucoup de
                    département et de musée donc les données sont bien visibles. En plus le Bar permet une lecture
                    rapide
                    de la donnée est dans comprendre rapidement les enjeux étudiés. De plus séparer les couleurs
                    améliorent
                    encore la lecture du graphe tout en le rendant plus agréable à l'oeil.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
