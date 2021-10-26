<template>
    <v-container>
        <v-card class="mx-4" flat color="transparent">
            <v-btn @click="editUsername" block class="my-2">
                <v-icon> mdi-account-edit </v-icon>
                <span>Edit username<br /></span>
            </v-btn>

            <v-btn @click="resetPassword" block class="my-2">
                <v-icon> mdi-lock-reset </v-icon>
                <span>Reset Password<br /></span>
            </v-btn>
        </v-card>
        <v-dialog v-model="dialogEditUsername" persistent>
            <v-card>
                <v-card-title class="text-h6">
                    Edit username
                </v-card-title>
                <v-card-text>
                    Enter new username
                </v-card-text>
                <input type="text" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogEditUsername = false">
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
                    <v-btn color="green darken-1" text @click="dialogPassword = false">
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped></style>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    data() {
        return { dialogPassword: false, dialogEditUsername: false };
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
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: this.inp,
            })
                .then(() => {
                    this.dialogEditUsername = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>
