<template>
    <v-card flat outlined class="mb-2" @click="confirmationDialog">
        <v-container>
            <v-row>
                <v-col>
                    <div class="d-flex align-center flex-grow-1 flex-wrap">
                        <div>
                            <v-icon large class="pr-2">{{
                                icons.mdiBus
                            }}</v-icon>
                        </div>
                        <div class="me-auto pe-2">
                            <h4 class="font-weight-semibold">
                                {{ start }} - {{ destination }}
                            </h4>

                            <v-chip dark color="green" class="mr-2" x-small>{{
                                route
                            }}</v-chip>
                            <v-chip dark color="green" class="" x-small>{{
                                type
                            }}</v-chip>
                            <h1></h1>
                        </div>

                        <h2 class="font-weight-semibold secondary--text">
                            {{ price }} LKR
                        </h2>
                    </div>
                </v-col>
            </v-row>

            <!-- confirmation dialog -->
            <v-dialog v-model="dialog" persistent>
                <v-card>
                    <v-card-title class="text-h6">
                        Do you want to buy this ticket?
                    </v-card-title>
                    <v-card-text>
                        This will deduct {{ price }} LKR from your wallet.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                        >
                            No
                        </v-btn>
                        <v-btn color="green darken-1" text @click="buyTicket">
                            Yes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- not enough money dialog -->
            <v-dialog v-model="errorDialog" persistent>
                <v-card>
                    <v-card-title class="text-h6">
                        Not enough money!
                    </v-card-title>
                    <v-card-text>
                        There is not enough money to complete the transaction.
                        Please add money to your wallet.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="error darken-1"
                            text
                            @click="errorDialog = false"
                        >
                            Okay
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-card>
</template>

<style scoped></style>

<script>
import { mdiBus } from '@mdi/js';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    props: ['start', 'destination', 'route', 'price', 'type'],
    name: 'RecentRide',
    data() {
        return {
            dialog: false,
            errorDialog: false,
            options: {
                hour: 'numeric',
                minute: 'numeric',
            },
            icons: {
                mdiBus,
            },
        };
    },
    methods: {
        confirmationDialog() {
            this.dialog = true;
        },
        buyTicket() {
            this.dialog = false;

            // IF NOT ENOUGH MONEY RETURN !IMPORTANT
            if (parseInt(this.price) > parseInt(this.getWalletAmount)) {
                this.errorDialog = true;
                return;
            }

            const user = firebase.auth().currentUser;
            axios
                .post('http://localhost:5000/tickets/buy', {
                    userId: user.uid,
                    start: this.start,
                    destination: this.destination,
                    route: this.route,
                    price: this.price,
                    type: this.type,
                })
                .then(response => {
                    console.log(response.data.price);
                    // create a new debit transaction
                    axios
                        .post('http://localhost:5000/transactions/create', {
                            userId: user.uid,
                            type: 'debit',
                            amount: this.price,
                            token: null,
                        })
                        .then(response => {
                            this.$store.commit(
                                'initializeWallet',
                                parseInt(response.data.updatedWalletAmount)
                            );
                            this.$store.dispatch('getLatestTransactions');
                            this.$store.dispatch('getLatestTickets');
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    computed: {
        getWalletAmount() {
            return this.$store.state.walletAmount;
        },
    },
};
</script>
