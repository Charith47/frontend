<template>
    <v-container class="my-10">
        <v-card flat outlined class="auth-card my-12">
            <!-- logo -->
            <v-card-title class="d-flex align-center justify-center py-7">
                <v-img
                    :src="require('@/assets/logo/logo-circle-purple.svg')"
                    max-height="30px"
                    max-width="30px"
                    alt="logo"
                    contain
                    class="me-3"
                ></v-img>

                <h2 class="text-2xl font-weight-semibold primary--text">
                    UNIBUS
                </h2>
            </v-card-title>

            <!-- title -->
            <v-card-text class="d-flex justify-center">
                <v-row>
                    <v-col>
                        <p
                            class="
                                text-2xl
                                font-weight-semibold
                                text--primary
                                mb-2
                            "
                        >
                            Welcome to Unibus! 👋🏻
                        </p>
                        <p class="mb-2">
                            Please sign-in to your account and start the ride
                        </p>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- error alert -->

            <v-alert
                class="mx-4"
                v-if="error"
                border="left"
                color="red"
                dense
                type="error"
                >{{ error }}</v-alert
            >

            <!-- login form -->
            <v-card-text>
                <v-form @submit.prevent="pressed">
                    <v-text-field
                        :error-messages="emailErrors"
                        v-model="email"
                        label="Email"
                        placeholder="yourname@example.com"
                        outlined
                        class="mb-3"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="passwordErrors"
                        v-model="password"
                        label="Password"
                        placeholder="Enter your password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        outlined
                        :append-icon="
                            isPasswordVisible
                                ? icons.mdiEyeOffOutline
                                : icons.mdiEyeOutline
                        "
                        @click:append="isPasswordVisible = !isPasswordVisible"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                    ></v-text-field>

                    <a href="javascript:void(0)" class="mt-1">
                        Forgot Password?
                    </a>

                    <v-btn
                        :loading="isLoading"
                        type="submit"
                        block
                        color="primary"
                        class="mt-6"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text
                class="d-flex align-center justify-center flex-wrap mt-2"
            >
                <span class="me-2"> New on our platform? </span>
                <router-link :to="{ name: 'Register' }">
                    Create an account
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

import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations: {
        email: { required, email },
        password: { required },
    },
    methods: {
        async pressed() {
            this.$v.$touch();

            // if validation errors occur, abort
            console.log(this.emailErrors, this.passwordErrors);
            if (
                this.emailErrors.length !== 0 ||
                this.passwordErrors.length !== 0
            )
                return;

            try {
                // start loading animation on click
                this.isLoading = true;

                const user = await firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password);
                console.log(user);

                const firebaseUser = firebase.auth().currentUser;
                const db = firebase.firestore();
                const usersCollection = db.collection('users');
                const userRef = usersCollection.doc(firebaseUser.uid);

                userRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log('wallet updated');
                        this.$store.commit(
                            'initializeWallet',
                            doc.data().walletAmount
                        );
                        console.log(
                            `Login Wallet Amount: ${doc.data().walletAmount}`
                        );
                    } else {
                        console.log('No user data :(');
                    }
                });

                this.$router.replace({ name: 'Home' });
            } catch (err) {
                // stop loading animation if error occurs
                this.isLoading = false;

                const errorMessage = err.message.toString().split('/')[1];
                console.log(errorMessage);
                if (errorMessage.startsWith('wrong-password')) {
                    this.error = 'Incorrect password';
                } else if (errorMessage.startsWith('user-not-found')) {
                    this.error = 'User not found';
                }
            }
        },
    },
    data() {
        return {
            email: '',
            password: '',
            error: '',
            isPasswordVisible: false,
            isLoading: false,
            icons: {
                mdiEyeOutline,
                mdiEyeOffOutline,
            },
        };
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
