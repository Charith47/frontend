import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Wallet from '../views/Wallet.vue'
import Scan from '../views/Scan.vue'
import Tickets from '../views/Tickets.vue'
import Account from '../views/Wallet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
