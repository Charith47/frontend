<template>
    <v-container class="mt-16 pt-16">
        <v-card class="mx-2 pt-14 mt-16" flat color="transparent">
            <v-btn
                @click="dialogEditUsername = true"
                block
                class="my-4"
                color="primary"
            >
                <v-icon> {{ icons.mdiAccountEdit }} </v-icon>
                <span>&nbsp;Edit username<br /></span>
            </v-btn>

            <v-btn @click="resetPassword" block class="my-2" color="primary">
                <v-icon> {{ icons.mdiLockReset }} </v-icon>
                <span>&nbsp;Reset Password<br /></span>
            </v-btn>
        </v-card>

        <v-dialog v-model="dialogEditUsername" persistent>
            <v-card>
                <v-card-title class="text-h6"> Edit username </v-card-title>
                <v-card-text> Enter new username </v-card-text>
                <v-text-field
                    :error-messages="newNameErrors"
                    type="text"
                    v-model="newName"
                    class="px-6"
                    @input="$v.newName.$touch()"
                    @blur="$v.newName.$touch()"
                ></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="dialogEditUsername = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn color="green darken-1" text @click="editUsername">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPassword" persistent>
            <v-card>
                <v-card-title class="text-h6">
                    Reset email has been sent
                </v-card-title>
                <v-card-text>
                    Check your email to reset your password
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialogPassword = false"
                    >
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-footer app bottom fixed class="d-flex justify-center">
            <span class="">Developed with 💜 by Group 05</span>
            <span class="secondary--text">
                Group Project in Software Development
            </span>
        </v-footer>
    </v-container>
</template>

<style scoped></style>

<script>
import { mdiAccountEdit, mdiLockReset } from '@mdi/js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations: {
        newName: { required, maxLength: maxLength(15) },
    },

    data() {
        return {
            dialogPassword: false,
            dialogEditUsername: false,
            newName: '',
            icons: {
                mdiAccountEdit,
                mdiLockReset,
            },
        };
    },

    methods: {
        resetPassword() {
            const user = firebase.auth().currentUser;
            firebase
                .auth()
                .sendPasswordResetEmail(user.email)
                .then(() => {
                    this.dialogPassword = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editUsername() {
            this.$v.$touch();

            if (this.newNameErrors.length !== 0) return;

            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: this.newName,
            }).then(() => {
                console.log('Username changed successfully');
                this.dialogEditUsername = false;
            });
        },
    },
    computed: {
        newNameErrors() {
            const errors = [];
            if (!this.$v.newName.$dirty) return errors;
            !this.$v.newName.maxLength &&
                errors.push('Username cannot be more than 15 characters long');
            !this.$v.newName.required && errors.push('Username is required.');
            return errors;
        },
    },
};
</script>
