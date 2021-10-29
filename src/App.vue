<template>
    <v-app id="main">
        <!-- top app bar -->
        <v-app-bar v-if="this.appBarState" app dense>
            <!-- top app bar -->
            <v-spacer></v-spacer>
            <v-chip
                class="px-3 mx-4"
                color="primary"
                small
                v-if="this.selectedTicket.length != 0"
            >
                {{ this.selectedTicket[1] }}
            </v-chip>

            <!-- wallet amount -->
            <span class="mr-2 secondary--text">
                {{ this.getWalletAmount }} LKR</span
            >
        </v-app-bar>

        <!-- router view -->
        <v-main>
            <router-view />
        </v-main>

        <!-- bottom nav bar -->
        <v-bottom-navigation v-if="this.appBarState" app color="primary" grow>
            <v-btn class="nav-btn-main" to="/">
                <v-icon>{{ icons.mdiHome }}</v-icon>
            </v-btn>

            <v-btn class="nav-btn-main" to="/wallet">
                <v-icon>{{ icons.mdiWallet }}</v-icon>
            </v-btn>

            <v-btn class="nav-btn-main" to="/scan">
                <v-icon>{{ icons.mdiQrcode }}</v-icon>
            </v-btn>
            <v-btn class="nav-btn-main" to="/tickets">
                <v-icon>{{ icons.mdiTicketConfirmation }}</v-icon>
            </v-btn>
            <v-btn class="nav-btn-main" to="/account">
                <v-icon>{{ icons.mdiAccount }}</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<style>
#main {
    background-color: #f4f5fa;
    background-size: cover;
}
.nav-btn-main {
    height: auto !important;
}

/* roboto-100 - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    src: local(''), url('../fonts/roboto-v29-latin-100.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-300 - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local(''), url('../fonts/roboto-v29-latin-300.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-regular - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url('../fonts/roboto-v29-latin-regular.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-500 - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local(''), url('../fonts/roboto-v29-latin-500.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700 - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local(''), url('../fonts/roboto-v29-latin-700.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-900 - latin */
@font-face {
    font-display: swap;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    src: local(''), url('../fonts/roboto-v29-latin-900.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('../fonts/roboto-v29-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
</style>

<script>
import {
    mdiAccount,
    mdiHome,
    mdiWallet,
    mdiQrcode,
    mdiTicketConfirmation,
} from '@mdi/js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
    data: () => ({
        icons: {
            mdiAccount,
            mdiHome,
            mdiWallet,
            mdiQrcode,
            mdiTicketConfirmation,
        },
    }),
    created() {
        const user = firebase.auth().currentUser;

        if (user) {
            // show app bars
            // update wallet amount
            const db = firebase.firestore();
            const usersCollection = db.collection('users');
            const userRef = usersCollection.doc(user.uid);

            userRef
                .get()
                .then(doc => {
                    if (doc.exists) {
                        this.$store.commit(
                            'initializeWallet',
                            doc.data().walletAmount
                        );
                        console.log(
                            `Wallet Amount: ${doc.data().walletAmount}`
                        );
                    } else {
                        console.log('No user data :(');
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            this.$store.commit('showAppBars');
        } else this.$store.commit('hideAppBars');
    },
    computed: {
        appBarState() {
            return this.$store.state.showAppBars;
        },
        getWalletAmount() {
            return this.$store.state.walletAmount;
        },
        selectedTicket() {
            return this.$store.state.selectedTicket;
        },
    },
    watch: {
        $route(to) {
            if (to.fullPath === '/login' || to.fullPath === '/register')
                this.$store.commit('hideAppBars');
            else this.$store.commit('showAppBars');
        },
    },
    name: 'App',
};
</script>
