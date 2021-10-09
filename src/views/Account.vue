<template>
	<v-container>
		<v-card class="d-flex justify-center" flat color="transparent">
			<v-avatar color="indigo" size="128">
				<span>{{ this.user.displayName.split('')[0] }}</span>
			</v-avatar>
		</v-card>
		<v-card flat outlined class="px-2 py-2">
			<span>{{ this.user.displayName }}<br /></span>
			<span>{{ this.user.email }}</span>

			<v-btn @click="logout" block color="primary">
				Logout
			</v-btn>
		</v-card>
	</v-container>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
	mounted() {
		console.log('Account page mounted');
		this.user = firebase.auth().currentUser;
		console.log(this.user);
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
	},
	data() {
		return {
			user: '',
			loggedIn: false,
		};
	},
	name: 'Account',
};
</script>
