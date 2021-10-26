import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Wallet from '../views/Wallet.vue';
import Scan from '../views/Scan.vue';
import Tickets from '../views/Tickets.vue';
import Account from '../views/Account.vue';
import Settings from '../views/settings/Settings.vue'

import Recharge from '../views/recharge/Recharge.vue';

import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import VerifyEmail from '../views/auth/VerifyEmail.vue';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet,
        meta: { requiresAuth: true },
    },
    {
        path: '/scan',
        name: 'Scan',
        component: Scan,
        meta: { requiresAuth: true },
    },
    {
        path: '/tickets',
        name: 'Tickets',
        component: Tickets,
        meta: { requiresAuth: true },
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: { requiresAuth: true },
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: Recharge,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { hideForAuth: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { hideForAuth: true },
    },
    {
        path: '/verify',
        name: 'Verify',
        component: VerifyEmail,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {  requiresAuth: true },
    },
    
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
    const hideForAuth = to.matched.some(record => record.meta.hideForAuth);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }

    if (hideForAuth && isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

/* eslint-enable no-unused-vars */

export default router;
