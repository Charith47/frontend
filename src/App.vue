<template>
	<v-app id="main">
		<!-- top app bar -->
		<v-app-bar v-if="this.appBarState" app dense>
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
		<v-bottom-navigation v-if="this.appBarState" app color="primary" grow>
			<v-btn class="nav-btn-main" to="/">
				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn class="nav-btn-main" to="/wallet">
				<v-icon>mdi-wallet</v-icon>
			</v-btn>

			<v-btn class="nav-btn-main" to="/scan">
				<v-icon>mdi-qrcode</v-icon>
			</v-btn>
			<v-btn class="nav-btn-main" to="/tickets">
				<v-icon>mdi-ticket-confirmation</v-icon>
			</v-btn>
			<v-btn class="nav-btn-main" to="/account">
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
.nav-btn-main{
	height: auto !important;
}
</style>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
	data: () => ({
		walletAmount: 245.76,
	}),
	created() {
		const user = firebase.auth().currentUser;
		if (user) this.$store.commit('showAppBars');
		else this.$store.commit('hideAppBars');
	},
	computed: {
		appBarState() {
			return this.$store.state.showAppBars;
		},
	},
	watch: {
		$route(to) {
			if (to.fullPath === '/login' || to.fullPath === '/register')
				this.$store.commit('hideAppBars');
			else this.$store.commit('showAppBars');
		},
	},
	name: 'App',
};
</script>
