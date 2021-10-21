<template>
    <v-container>
        <span>
            <h1 class="pt-2 font-weight-medium primary--text">
                Hi, {{ name }}!
            </h1></span
        >
        <p class="secondary--text">Let's check out your wallet</p>

        <v-card flat outlined class="my-4 px-4 py-4">
            <h4 class="font-weight-regular secondary--text">Balance</h4>
            <span
                ><h1 class="font-weight-medium secondary--text">
                    {{ this.$store.state.walletAmount }}
                </h1></span
            >
            <v-btn to="/recharge" outlined block color="primary"
                >RECHARGE</v-btn
            >
        </v-card>

        <v-divider></v-divider>
        <h1 class="pt-4 font-weight-medium primary--text">History</h1>
        <p class="secondary--text">
            Here is the latest transactions you performed
        </p>

        <TransactionCard
            v-for="transaction in latestTransactions"
            :key="transaction.transactionId"
            :type="transaction.type"
            :date="transaction.date"
            :amount="transaction.amount"
        >
        </TransactionCard>

        <!--on transaction fetch error-->
        <v-alert border="left" color="red" dense outlined type="error">
            {{ fetchError }}
        </v-alert>
    </v-container>
</template>

<script>
import TransactionCard from '../components/TransactionCard.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    mounted() {
        this.$store.dispatch('getLatestTransactions');
        const user = firebase.auth().currentUser;
        if (user) {
            this.name = user.displayName;
        }
    },
    components: {
        TransactionCard,
    },
    data() {
        return {
            name: '',
            fetchError: '',
        };
    },
    computed: {
        latestTransactions() {
            return this.$store.state.latestTransactions;
        },
    },
    name: 'Wallet',
};
</script>
