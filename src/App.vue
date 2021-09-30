<template>
	<v-app id="main">
		<!-- top app bar -->
		<v-app-bar v-if="showAppBars" app dense>
			<v-spacer></v-spacer>

			<!-- wallet amount -->
			<span class="mr-2 secondary--text">
				<!-- <v-icon color="black">mdi-circle-multiple</v-icon> -->
				{{ walletAmount }} LKR</span
			>
		</v-app-bar>

		<!-- router view -->
		<v-main>
			<router-view />
		</v-main>

		<!-- bottom nav bar -->
		<v-bottom-navigation v-if="showAppBars" app color="primary" grow>
			<v-btn to="/">
				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn to="/wallet">
				<v-icon>mdi-wallet</v-icon>
			</v-btn>

			<v-btn to="/scan">
				<v-icon>mdi-qrcode</v-icon>
			</v-btn>
			<v-btn to="/tickets">
				<v-icon>mdi-ticket-confirmation</v-icon>
			</v-btn>
			<v-btn to="/account">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<style>
#main {
	background-color: #f4f5fa;
	background-size: cover;
}
.nav-buttons > a {
	height: auto !important;
}
</style>

<script>
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';

export default {
	name: 'App',
	data: () => ({
		user:'',
		showAppBars: false,
		walletAmount: 245.76,
	}),
	mounted(){

	},
	watch: {
		$route(to) {
			if (to.fullPath === '/login' || to.fullPath === '/register')
				this.showAppBars = false;
			else this.showAppBars = true;
		},
	},
};
</script>
