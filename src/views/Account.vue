<template>
    <v-container id="background" class="red py-12">
        <v-row class="d-flex flex-column">
            <!--User avatar-->
            <v-card class="d-flex justify-center" flat color="transparent">
                <v-avatar color="indigo" size="110">
                    <span class="white--text text-h3">{{
                        initials.toUpperCase()
                    }}</span>
                </v-avatar>
            </v-card>

            <!--User DN and email-->
            <v-card
                class="d-flex flex-column justify-center pt-6 pb-4"
                flat
                color="transparent"
            >
                <v-card class="d-flex justify-center" flat color="transparent">
                    <span
                        ><v-icon> mdi-account </v-icon>{{ displayName }}<br
                    /></span>
                </v-card>
                <v-card class="d-flex justify-center" flat color="transparent">
                    <v-icon> mdi-email </v-icon>
                    <span>{{ email }}<br /></span>
                </v-card>
            </v-card>

            <!--User settings and more-->
            <br />
            <v-card class="mx-4" flat color="transparent">
                <v-btn large block class="my-2">
                    <v-icon> mdi-bus </v-icon>
                    <span>Ride History<br /></span>
                </v-btn>
                <v-btn large block class="my-2" @click="paymentHistory = true">
                    <v-icon> mdi-cash </v-icon>
                    <span>Payment History<br /></span>
                </v-btn>
                <v-btn large to="/settings" block class="my-2">
                    <v-icon> mdi-cog </v-icon>
                    <span>Settings<br /></span>
                </v-btn>
                <br /><br /><br /><br /><br /><br />
                <v-btn @click="logout" class="my-2" block color="primary">
                    <v-icon> mdi-logout </v-icon>
                    Logout
                </v-btn>
            </v-card>
        </v-row>

        <!-- payment history dialog -->
        <v-dialog
            v-model="paymentHistory"
            fullscreen
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="paymentHistory = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Payment History</v-toolbar-title>
                </v-toolbar>

                <v-card flat color="trnasparent" class="mx-2 my-4">
                    <!--on no recent tickets-->
                    <v-alert
                        v-if="allTransactions.length === 0"
                        border="left"
                        color="blue"
                        dense
                        outlined
                        type="info"
                    >
                        No payment history to show
                    </v-alert>

                    <TransactionCard
                        v-else
                        v-for="transaction in allTransactions"
                        :key="transaction.transactionId"
                        :type="transaction.type"
                        :date="transaction.date"
                        :amount="transaction.amount"
                    >
                    </TransactionCard>
                </v-card>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped>
#background {
    background: url('../assets/backgrounds/size-04.png') no-repeat center center
        fixed !important;
    height: inherit;
    overflow-y: hidden;
}
</style>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import TransactionCard from '../components/TransactionCard.vue';

export default {
    components: {
        TransactionCard,
    },
    async mounted() {
        this.user = firebase.auth().currentUser;
        if (this.user) {
            this.email = this.user.email;
            this.displayName = this.user.displayName;
            this.initials = this.userInitials(this.displayName);
        }

        try {
            await this.$store.dispatch('getAllTransactions');
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async logout() {
            try {
                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.replace({ name: 'Login' });
            } catch (err) {
                console.log(err);
            }
        },

        userInitials(displayName) {
            const name = displayName.split(' ');
            return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
        },
    },
    data() {
        return {
            rideHistory: false,
            paymentHistory: false,
            user: '',
            displayName: '',
            initials: '',
            email: '',
            loggedIn: false,
        };
    },
    name: 'Account',
    computed: {
        allTransactions() {
            return this.$store.state.allTransactions;
        },
    },
};
</script>
