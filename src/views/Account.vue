<template>
	<v-container>
		<h1>Account</h1>
		<v-btn @click="logout" block color="primary">
			Logout
		</v-btn>
	</v-container>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
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
	},
	data() {
		return {
			loggedIn: false,
		};
	},
	name: 'Account',
};
</script>
