<template>
	<v-container>
		<v-card class="auth-card">
			<!-- logo -->
			<v-card-title class="d-flex align-center justify-center py-7">
				<router-link to="/" class="d-flex align-center">
					<v-img
						:src="require('@/assets/logo/logo-circle-purple.svg')"
						max-height="30px"
						max-width="30px"
						alt="logo"
						contain
						class="me-3 "
					></v-img>

					<h2 class="text-2xl font-weight-semibold">
						Unibus
					</h2>
				</router-link>
			</v-card-title>

			<!-- title -->
			<v-card-text>
				<p class="text-2xl font-weight-semibold text--primary mb-2">
					Ride starts here 🚀
				</p>
				<p class="mb-2">
					Make your bus rides easy!
				</p>
			</v-card-text>

			<!-- login form -->
			<v-card-text>
				<v-form @submit.prevent="pressed">
					<v-text-field
						v-model="username"
						outlined
						label="Username"
						placeholder="Enter your name"
						hide-details
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="email"
						outlined
						label="Email"
						placeholder="Enter your email"
						hide-details
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="password"
						outlined
						:type="isPasswordVisible ? 'text' : 'password'"
						label="Password"
						placeholder="············"
						:append-icon="
							isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
						"
						hide-details
						@click:append="isPasswordVisible = !isPasswordVisible"
					></v-text-field>

					<v-checkbox hide-details class="mt-1">
						<template #label>
							<div class="d-flex align-center flex-wrap">
								<span class="me-2">I agree to</span
								><a href="javascript:void(0)">privacy policy &amp; terms</a>
							</div>
						</template>
					</v-checkbox>

					<v-btn type="submit" block color="primary" class="mt-6">
						Sign Up
					</v-btn>
				</v-form>
			</v-card-text>

			<!-- create new account  -->
			<v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
				<span class="me-2">
					Already have an account?
				</span>
				<router-link :to="{ name: 'Login' }">
					Sign in instead
				</router-link>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

export default {
	data() {
		return {
			email: '',
			password: '',
			username: '',
			error: '',
			isPasswordVisible: false,
			icons: {
				mdiEyeOutline,
				mdiEyeOffOutline,
			},
		};
	},
	methods: {
		async pressed() {
			try {
				await firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password);

				const user = firebase.auth().currentUser;
				user.updateProfile({
					displayName: this.username,
				});

				this.$router.replace({ name: 'Home' });
			} catch (err) {
				console.log(err);
			}
		},
	},
	name: 'Login',
};
</script>

<style lang="scss">
@import '~@/plugins/auth-styles/auth.scss';
</style>
