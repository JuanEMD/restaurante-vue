import Vue from 'vue'
import VueRouter from 'vue-router'
import Registros from '../views/Registros.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/registros',
    name: 'Registros',
    component: () => import('../views/Registros.vue')
  },
  {
    path: '/',
    name: 'registros',
    component: Registros
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
