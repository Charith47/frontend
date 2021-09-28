<template>
	<v-container>
		<br /><br />
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
					Welcome to Unibus! 👋🏻
				</p>
				<p class="mb-2">
					Please sign-in to your account and start the ride
				</p>
			</v-card-text>

			<!-- login form -->
			<v-card-text>
				<v-form @submit.prevent="pressed">
					<v-text-field
						v-model="email"
						outlined
						label="Email"
						placeholder="email@example.com"
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

					<div class="d-flex align-center justify-space-between flex-wrap">
						<v-checkbox label="Remember Me" hide-details class="me-3 mt-1">
						</v-checkbox>

						<!-- forgot link -->
						<a href="javascript:void(0)" class="mt-1">
							Forgot Password?
						</a>
					</div>

					<v-btn type="submit" block color="primary" class="mt-6">
						Login
					</v-btn>
				</v-form>
			</v-card-text>

			<!-- create new account  -->
			<v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
				<span class="me-2">
					New on our platform?
				</span>
				<router-link :to="{ name: 'pages-register' }">
					Create an account
				</router-link>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
	methods: {
		async pressed() {
			try {
				const user = await firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password);
				console.log(user);
				this.$router.replace({ name: 'Home' });
			} catch (err) {
				console.log(err);
			}
		},
	},
	data() {
		return {
			isPasswordVisible: false,
			email: '',
			password: '',
			icons: {
				mdiEyeOutline,
				mdiEyeOffOutline,
			},
		};
	},
	name: 'Login',
};
</script>
<style lang="scss">
@import '~@/plugins/auth-styles/auth.scss';
</style>
