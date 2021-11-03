import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/Home.vue');

const Wallet = () => import(/* webpackChunkName: "group-wallet" */'../views/Wallet.vue');
const Recharge = () => import(/* webpackChunkName: "group-wallet" */'../views/recharge/Recharge.vue');

const Scan = () => import(/* webpackChunkName: "group-scan" */'../views/Scan.vue');
const Tickets = () => import(/* webpackChunkName: "group-scan" */'../views/Tickets.vue');

const Account = () => import(/* webpackChunkName: "group-account" */'../views/Account.vue');
const Settings = () => import(/* webpackChunkName: "group-account" */'../views/settings/Settings.vue');


const Login = () => import('../views/auth/Login.vue');
const Register = () => import('../views/auth/Register.vue');

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
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true },
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
