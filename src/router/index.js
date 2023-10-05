import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'; 
import Test from '../views/ApiTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/test', //change this 
    name: 'ApiTest',
    component : Test//na
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
