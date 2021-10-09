<template>
	<v-container class="my-7">
		<v-card outlined flat class="auth-card">
			<!-- logo -->
			<v-card-title class="d-flex align-center justify-center pt-5">
				<router-link to="/" class="d-flex align-center">
					<v-img
						:src="require('@/assets/logo/logo-circle-purple.svg')"
						max-height="30px"
						max-width="30px"
						alt="logo"
						contain
						class="me-3"
					></v-img>
					<h2 class="text-2xl font-weight-semibold">
						UNIBUS
					</h2>
				</router-link>
			</v-card-title>

			<!-- title -->
			<v-card-text class="d-flex justify-center py-1">
				<h3 class="text--primary font-weight-light my-0">
					🚌 Your ride starts here <br />
				</h3>
			</v-card-text>

			<!-- login form -->
			<v-card-text>
				<v-form @submit.prevent="pressed">
					<v-text-field
						v-model="username"
						outlined
						label="Username"
						placeholder="Enter your name"
						class="mb-1"
					></v-text-field>

					<v-text-field
						v-model="email"
						outlined
						label="Email"
						placeholder="Enter your email"
						class="mb-1"
					></v-text-field>

					<v-text-field
						v-model="password"
						outlined
						:type="isPasswordVisible ? 'text' : 'password'"
						label="Password"
						placeholder="Enter a secure password"
						:append-icon="
							isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
						"
						@click:append="isPasswordVisible = !isPasswordVisible"
					></v-text-field>

					<v-text-field
						class="mt-1"
						v-model="password"
						outlined
						:type="isPasswordVisible ? 'text' : 'password'"
						label="Confirm Password"
						placeholder="Confirm your password"
						:append-icon="
							isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
						"
						@click:append="isPasswordVisible = !isPasswordVisible"
					></v-text-field>

					<v-checkbox class="mt-1">
						<template #label>
							<div class="d-flex align-center flex-wrap">
								<span class="me-2">I agree to</span
								><a href="javascript:void(0)">privacy policy &amp; terms</a>
							</div>
						</template>
					</v-checkbox>

					<v-btn type="submit" block color="primary" class="mt-2">
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

<style scoped>
a {
	text-decoration: none;
}
</style>

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
	computed: {
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('Must be valid e-mail');
			!this.$v.email.required && errors.push('E-mail is required');
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.email.required && errors.push('Password is required');
			return errors;
		},
	},
	name: 'Login',
};
</script>

<style lang="scss">
@import '~@/plugins/auth-styles/auth.scss';
</style>
