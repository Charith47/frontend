import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Wallet from '../views/Wallet.vue';
import Scan from '../views/Scan.vue';
import Tickets from '../views/Tickets.vue';
import Account from '../views/Wallet.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/wallet',
		name: 'Wallet',
		component: Wallet,
	},
	{
		path: '/scan',
		name: 'Scan',
		component: Scan,
	},
	{
		path: '/tickets',
		name: 'Tickets',
		component: Tickets,
	},
	{
		path: '/account',
		name: 'Account',
		component: Account,
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

export default router;
