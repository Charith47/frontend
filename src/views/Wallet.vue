<template>
    <v-container>
        <span>
            <h1 class="pt-2 font-weight-medium primary--text">
                Hi, {{ this.userName }}!
            </h1></span
        >
        <p class="secondary--text">Let's check out your wallet</p>

        <v-card flat outlined class="my-4 px-4 py-4">
            <h4 class="font-weight-regular secondary--text">Balance</h4>
            <span
                ><h1 class="font-weight-medium secondary--text">
                    {{ this.$store.state.walletAmount }} LKR
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

        <!--on no transactions-->
        <v-alert
            v-if="(latestTransactions.length == 0 && !this.fetchError) && !loadingCircle"
            border="left"
            color="blue"
            dense
            outlined
            type="info"
        >
            No transactions to show
        </v-alert>

        <TransactionCard
            v-else
            v-for="transaction in latestTransactions"
            :key="transaction.transactionId"
            :type="transaction.type"
            :date="transaction.date"
            :amount="transaction.amount"
        >
        </TransactionCard>

        <!--on transaction fetch error-->
        <v-alert
            v-if="fetchError"
            border="left"
            color="red"
            dense
            outlined
            type="error"
        >
            {{ fetchError }}
        </v-alert>

        <!-- loading transactions -->
        <div class="text-center">
            <v-progress-circular
            class="mt-10"
                v-if="loadingCircle"
                :size="40"
                :width="3"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>

    </v-container>
</template>

<script>
import TransactionCard from '../components/TransactionCard.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    async mounted() {
        const user = firebase.auth().currentUser;
        if (user) {
            this.name = user.displayName;
        }
        try {
            // set loading to true
            this.loadingCircle = true;
            await this.$store.dispatch('getLatestTransactions');
        } catch (error) {
            console.log(error);
            // set loading to false
            this.loadingCircle = false;
            this.fetchError = 'Error fetching transactions';
        }
    },
    components: {
        TransactionCard,
    },
    data() {
        return {
            loadingCircle: false,
            name: '',
            fetchError: '',
        };
    },
    computed: {
        latestTransactions() {
            return this.$store.state.latestTransactions;
        },
        userName() {
            return `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`;
        },
    },
    name: 'Wallet',
};
</script>
