<template>
    <v-container>
        <v-card flat class="px-2 py-2">
            <p class="secondary--text">
                Please enter the amount and card details
            </p>
            <v-text-field
                v-model="amount"
                autocomplete="false"
                dense
                outlined
                label="Amount (LKR)"
                type="number"
            ></v-text-field>
            <stripe-element-card
                ref="elementRef"
                :pk="pulishableKey"
                @token="tokenCreated"
            />

            <v-btn block color="primary" @click="submit"
                >Pay {{ amount }} <span v-if="amount"> LKR </span>
            </v-btn>
        </v-card>
    </v-container>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import axios from 'axios';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    components: {
        StripeElementCard,
    },
    data() {
        this.pulishableKey =
            'pk_test_51JdbLSHOhDuq1oSBXTT5Oz1ZjhK4uzKalsSgi8hBripsckK6FeFzewZIrRxLWa3ZeSK0fO3TkQ6FGvGbgaCXkWCG00oq5ERYio';
        return {
            amount: '',
            token: null,
        };
    },
    methods: {
        submit() {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
        sayHello() {
            console.log('Hello');
        },
        tokenCreated(token) {
            const user = firebase.auth().currentUser;

            axios
                .post('http://localhost:5000/transactions/create', {
                    userId: user.uid,
                    type: 'credit',
                    amount: this.amount,
                    token: token,
                })
                .then((response) => {
                    this.$store.commit(
                        'initializeWallet',
                        parseInt(response.data.updatedWalletAmount)
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>