import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Location from '../views/Location.vue'
import Map from '../views/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  },
  
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
