import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:eventCode',
    name: 'Event',
    component: () => import('../views/Event.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
