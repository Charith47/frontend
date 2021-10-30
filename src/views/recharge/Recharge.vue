<template>
    <v-container>
        <v-card flat class="px-2 py-2">
            <p class="secondary--text">
                Please enter the amount and card details
            </p>
            <v-text-field
                :error-messages="amountErrors"
                v-model="amount"
                autocomplete="false"
                dense
                outlined
                label="Amount (LKR)"
                type="number"
                @input="$v.amount.$touch()"
                @blur="$v.amount.$touch()"
            ></v-text-field>

            <stripe-element-card
                ref="elementRef"
                :pk="pulishableKey"
                @token="tokenCreated"
            />

            <v-btn block color="primary" @click="submit" :loading="isLoading"
                >Pay {{ amount }} <span v-if="amount"> LKR </span>
            </v-btn>
        </v-card>

        <!-- Success dialog -->
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="text-h5">
                    Payment Successful
                </v-card-title>

                <v-card-text>
                    Credited {{ amount }} to your wallet <br />
                    Transaction ID: {{ transactionId }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="success"
                        text
                        @click="dialog = false"
                        to="/wallet"
                    >
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Error dialog -->
        <v-dialog v-model="errorDialog" max-width="290">
            <v-card>
                <v-card-title class="text-h5"> Payment Error </v-card-title>

                <v-card-text>Insufficient funds in the card</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="error"
                        text
                        @click="errorDialog = false"
                        to="/wallet"
                    >
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import axios from 'axios';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { validationMixin } from 'vuelidate';
import { required, integer, minValue } from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations: {
        amount: { required, integer, minValue: minValue(50) },
    },
    mounted() {
        let stripeScript = document.createElement('script');
        stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
        document.head.appendChild(stripeScript);
    },
    components: {
        StripeElementCard,
    },
    data() {
        this.pulishableKey =
            'pk_test_51JdbLSHOhDuq1oSBXTT5Oz1ZjhK4uzKalsSgi8hBripsckK6FeFzewZIrRxLWa3ZeSK0fO3TkQ6FGvGbgaCXkWCG00oq5ERYio';
        return {
            isLoading: false,
            dialog: false,
            errorDialog: false,
            amount: '',
            transactionId: '',
            token: null,
        };
    },
    methods: {
        submit() {
            this.$v.$touch();
            if (this.amountErrors.length !== 0) return;

            // vue-stripe bug
            // event emits does not work
            // change and error events are required but not working
            // keep it this way for now

            this.$refs.elementRef.submit();
        },
        tokenCreated(token) {
            this.isLoading = true;
            const user = firebase.auth().currentUser;

            axios
                .post('http://localhost:5000/transactions/create', {
                    userId: user.uid,
                    type: 'credit',
                    amount: this.amount,
                    token: token,
                })
                .then(response => {
                    this.$store.commit(
                        'initializeWallet',
                        parseInt(response.data.updatedWalletAmount)
                    );
                    this.transactionId = response.data.transactionId;
                    this.isLoading = false;

                    // create success dialog
                    this.dialog = true;

                    // update transactions
                    this.$store.dispatch('getLatestTransactions');
                })
                .catch(error => {
                    // create fail dialog
                    this.isLoading = false;
                    this.errorDialog = true;
                    console.log(error);
                });
        },
    },
    computed: {
        amountErrors() {
            const errors = [];
            if (!this.$v.amount.$dirty) return errors;
            !this.$v.amount.required &&
                errors.push('Please specify an amount to recharge');
            !this.$v.amount.integer &&
                errors.push('Only enter an integer number for the amount');
            !this.$v.amount.minValue &&
                errors.push('At least 50 LKR should be recharged');
            return errors;
        },
    },
};
</script>
