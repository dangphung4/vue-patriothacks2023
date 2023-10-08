import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Location from '../views/Location.vue'
import Map from '../views/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: route => ({ key: route.fullPath }) 

  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
    props: route => ({ key: route.fullPath }) 

  },
  
  {
    path: '/map',
    name: 'Map',
    component: Map,
    props: route => ({ key: route.fullPath })

  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
