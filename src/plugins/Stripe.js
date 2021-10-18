import Vue from 'vue';
import { StripePlugin } from '@vue-stripe/vue-stripe';

const options = {
    pk:
        'pk_test_51JdbLSHOhDuq1oSBXTT5Oz1ZjhK4uzKalsSgi8hBripsckK6FeFzewZIrRxLWa3ZeSK0fO3TkQ6FGvGbgaCXkWCG00oq5ERYio',
};

Vue.use(StripePlugin, options);
