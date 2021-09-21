<template>
	<v-app>
		<!-- top app bar -->
		<v-app-bar app color="white" dark>
			<v-spacer></v-spacer>

			<!-- wallet amount -->
			<v-btn style="padding: 0; margin: 0" text>
				<span class="mr-2 black--text">
					<v-icon color="black">mdi-circle-multiple</v-icon>
					{{ walletAmount }} LKR</span
				>
			</v-btn>
		</v-app-bar>

		<!-- router view -->
		<v-main>
			<router-view />
		</v-main>

		<!-- bottom nav bar -->
		<v-bottom-navigation color="teal" grow>
			<v-btn to="/">
				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn to="/wallet">
				<v-icon>mdi-wallet</v-icon>
			</v-btn>

			<v-btn>
				<v-icon>mdi-qrcode</v-icon>
			</v-btn>
			<v-btn>
				<v-icon>mdi-ticket-confirmation</v-icon>
			</v-btn>
			<v-btn>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<style></style>

<script>
export default {
	name: 'App',

	data: () => ({
		walletAmount: 245.76,
	}),
};
</script>
