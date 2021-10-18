<template>
    <v-container >
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
                >Pay {{ amount }} <span v-if="amount"> LKR </span> </v-btn
            >
        </v-card>
    </v-container>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
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
            console.log(token);
            // handle the token
            // send it to your server
        },
    },
};
</script>