import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Wallet from '../views/Wallet.vue';
import Scan from '../views/Scan.vue';
import Tickets from '../views/Tickets.vue';
import Account from '../views/Account.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

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
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const isAuthenticated = firebase.auth().currentUser;

	if (requiresAuth && !isAuthenticated) {
		next('/login');
	}
	else{
		next()
	}
});
/* eslint-enable no-unused-vars */

export default router;
