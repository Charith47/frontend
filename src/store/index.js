import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showAppBars: false,
        walletAmount: 0,
        isEmailVerified: false,
        latestTransactions: [],
    },
    mutations: {
        showAppBars: state => {
            state.showAppBars = true;
        },
        hideAppBars: state => {
            state.showAppBars = false;
        },
        setEmailVerified: state => {
            state.isEmailVerified = true;
        },
        initializeWallet: (state, trueAmount) => {
            state.walletAmount = trueAmount;
        },
        addMoney: (state, rechargeAmount) => {
            state.walletAmount += rechargeAmount;
        },
        spendMoney: (state, spendAmount) => {
            state.walletAmount -= spendAmount;
        },
        updateTransactions: (state, latest) => {
            state.latestTransactions = latest;
        },
    },
    actions: {
        async getLatestTransactions({ commit }) {
            try {
                const user = firebase.auth().currentUser;
                const transactions = await axios.post(
                    'http://localhost:5000/transactions/latest',
                    {
                        userId: user.uid,
                    }
                );
                console.log(transactions);
                commit('updateTransactions', transactions.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
});
