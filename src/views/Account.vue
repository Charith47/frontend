<template>
	<v-container id="background" class="red py-12">
		<v-row class="d-flex flex-column">
			<!--User avatar-->
			<v-card class="d-flex justify-center" flat color="transparent">
				<v-avatar color="indigo" size="110">
					<span class="white--text text-h3">{{ initials.toUpperCase() }}</span>
				</v-avatar>
			</v-card>

			<!--User DN and email-->
			<v-card
				class="d-flex flex-column justify-center pt-6 pb-4"
				flat
				color="transparent"
			>
				<v-card class="d-flex justify-center" flat color="transparent">
					<span><v-icon> mdi-account </v-icon>{{ displayName }}<br /></span>
				</v-card>
				<v-card class="d-flex justify-center" flat color="transparent">
					<v-icon> mdi-email </v-icon>
					<span>{{ email }}<br /></span>
				</v-card>
			</v-card>

			<!--User settings and more-->
			<br>
			<v-card class="mx-4" flat color="transparent">
				<v-btn block class="my-2">
					<v-icon> mdi-bus </v-icon>
					<span>Ride History<br /></span>
				</v-btn>
				<v-btn block class="my-2">
					<v-icon> mdi-cash </v-icon>
					<span>Payment History<br /></span>
				</v-btn>
				<v-btn block class="my-2">
					<v-icon> mdi-cog </v-icon>
					<span>Settings<br /></span>
				</v-btn>
				<br><br><br><br><br><br><br>
				<v-btn @click="logout" class="my-2" block color="primary">
					<v-icon> mdi-logout </v-icon>
					Logout
				</v-btn>
			</v-card>
		</v-row>
	</v-container>
</template>

<style scoped>
#background {
	background: url('../assets/backgrounds/size-04.png') no-repeat center center
		fixed !important;
	height: inherit;
}
</style>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
	mounted() {
		this.user = firebase.auth().currentUser;
		if (this.user) {
			this.email = this.user.email;
			this.displayName = this.user.displayName;
			this.initials = this.userInitials(this.displayName);
		}
	},
	methods: {
		async logout() {
			try {
				const data = await firebase.auth().signOut();
				console.log(data);
				this.$router.replace({ name: 'Login' });
			} catch (err) {
				console.log(err);
			}
		},

		userInitials(displayName) {
			const name = displayName.split(' ');
			return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
		},
	},
	data() {
		return {
			user: '',
			displayName: '',
			initials: '',
			email: '',
			loggedIn: false,
		};
	},
	name: 'Account',
};
</script>
