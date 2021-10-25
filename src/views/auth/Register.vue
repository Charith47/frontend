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
                    <h2 class="text-2xl font-weight-semibold">UNIBUS</h2>
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
                        :error-messages="usernameErrors"
                        v-model="username"
                        outlined
                        label="Username"
                        placeholder="Enter your name"
                        class="mb-1"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="emailErrors"
                        v-model="email"
                        outlined
                        label="Email"
                        placeholder="Enter your email"
                        class="mb-1"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="passwordErrors"
                        v-model="password"
                        outlined
                        :type="isPasswordVisible ? 'text' : 'password'"
                        label="Password"
                        placeholder="Enter a secure password"
                        :append-icon="
                            isPasswordVisible
                                ? icons.mdiEyeOffOutline
                                : icons.mdiEyeOutline
                        "
                        @click:append="isPasswordVisible = !isPasswordVisible"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="confirmPasswordErrors"
                        class="mt-1"
                        v-model="confirmPassword"
                        outlined
                        :type="isPasswordVisible ? 'text' : 'password'"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        :append-icon="
                            isPasswordVisible
                                ? icons.mdiEyeOffOutline
                                : icons.mdiEyeOutline
                        "
                        @click:append="isPasswordVisible = !isPasswordVisible"
                        @input="$v.confirmPassword.$touch()"
                        @blur="$v.confirmPassword.$touch()"
                    ></v-text-field>

                    <v-checkbox
                        v-model="checkbox"
                        :error-messages="checkboxErrors"
                        @input="$v.checkbox.$touch()"
                        class="mt-1"
                    >
                        <template #label>
                            <div class="d-flex align-center flex-wrap">
                                <span class="me-2">I agree to</span
                                ><a href="javascript:void(0)"
                                    >privacy policy &amp; terms</a
                                >
                            </div>
                        </template>
                    </v-checkbox>

                    <v-btn
                        :loading="isLoading"
                        type="submit"
                        block
                        color="primary"
                        class="mt-2"
                    >
                        Sign Up
                    </v-btn>
                </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text
                class="d-flex align-center justify-center flex-wrap mt-2"
            >
                <span class="me-2"> Already have an account? </span>
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
import 'firebase/compat/firestore';

import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

import { validationMixin } from 'vuelidate';
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
} from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(8) },
        confirmPassword: { required, sameAs: sameAs('password') },
        username: { required, maxLength: maxLength(15) },
        checkbox: { sameAs: sameAs(() => true) },
    },
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            error: '',
            isPasswordVisible: false,
            isLoading: false,
            checkbox: false,
            icons: {
                mdiEyeOutline,
                mdiEyeOffOutline,
            },
        };
    },
    methods: {
        async pressed() {
            try {
                this.$v.$touch();

                // if validation errors occur, abort
                console.log(this.emailErrors, this.passwordErrors);
                if (
                    this.usernameErrors.length !== 0 ||
                    this.emailErrors.length !== 0 ||
                    this.passwordErrors.length !== 0 ||
                    this.confirmPasswordErrors.length !== 0 ||
                    this.checkboxErrors.length !== 0
                )
                    return;

                // start loading animation
                this.isLoading = true;
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password);

                const user = firebase.auth().currentUser;

                const actionCodeSettings = {
                    url: 'https://passenger.unibus-app.ml/',
                };
                user.sendEmailVerification(actionCodeSettings).then(()=>{
                    console.log('Email has been sent!')
                });

                user.updateProfile({
                    displayName: this.username,
                });

                const storeUser = JSON.parse(JSON.stringify(user));

                const db = firebase.firestore();
                const usersCollection = db.collection('users');

                usersCollection.doc(user.uid).set(storeUser);
                usersCollection
                    .doc(user.uid)
                    .set({ walletAmount: 0 }, { merge: true });

                this.$store.commit('initializeWallet', 0);
                this.$router.replace({ name: 'Home' });
            } catch (err) {
                // stop loading animation
                this.isLoading = false;
                console.log(err);
            }
        },
    },
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.maxLength &&
                errors.push('Username cannot be more than 15 characters long');
            !this.$v.username.required && errors.push('Username is required.');
            return errors;
        },
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
            !this.$v.password.required && errors.push('Password is required');
            !this.$v.password.minLength &&
                errors.push('Password should be at least 8 charachters long');
            return errors;
        },
        confirmPasswordErrors() {
            const errors = [];
            if (!this.$v.confirmPassword.$dirty) return errors;
            !this.$v.confirmPassword.required &&
                errors.push('Confirm your password');
            !this.$v.confirmPassword.sameAs &&
                errors.push(
                    'Confirm password should be the same as your password'
                );
            return errors;
        },
        checkboxErrors() {
            const errors = [];
            if (!this.$v.checkbox.$dirty) return errors;
            !this.$v.checkbox.sameAs &&
                errors.push('You must agree to continue');
            return errors;
        },
    },
    name: 'Login',
};
</script>

<style lang="scss">
@import '~@/plugins/auth-styles/auth.scss';
</style>
