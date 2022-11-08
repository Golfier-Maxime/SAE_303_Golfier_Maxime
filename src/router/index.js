import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/Map.vue'
import Graph1View from '../views/Graph1.vue'
import Graph2View from '../views/Graph2.vue'
import Graph3View from '../views/Graph3.vue'
import Graph4View from '../views/Graph4.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/map', name: 'MapView', component: MapView },
    { path: '/graph1', name: 'Graph1View', component: Graph1View },
    { path: '/graph2', name: 'Graph2View', component: Graph2View },
    { path: '/graph3', name: 'Graph3View', component: Graph3View },
    { path: '/graph4', name: 'Graph4View', component: Graph4View },
  ]
})

export default router
