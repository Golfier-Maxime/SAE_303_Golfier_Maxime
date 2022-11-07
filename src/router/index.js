import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/Map.vue'
import Graph1View from '../views/Graph1.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/map', name: 'MapView', component: MapView },
    { path: '/graph1', name: 'Graph1View', component: Graph1View }
  ]
})

export default router
