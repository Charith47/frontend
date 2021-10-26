import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedTicket: [],
        showAppBars: false,
        walletAmount: 0,
        isEmailVerified: false,
        latestTransactions: [],
        allTransactions: [],
        latestTickets: [],
        allTickets: [],
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
        updateAllTransactions: (state, all) => {
            state.allTransactions = all;
        },
        updateTickets: (state, latest) => {
            state.latestTickets = latest;
        },
        updateAllTickets: (state, all) => {
            state.allTickets = all;
        },
        selectTicket: (state, ticket) => {
            // array [0] ticketID
            // array [1] Start-Dest
            state.selectedTicket = ticket;
        },
    },
    actions: {
        async getLatestTransactions({ commit }) {
            const user = firebase.auth().currentUser;
            const transactions = await axios.post(
                'http://localhost:5000/transactions/latest',
                {
                    userId: user.uid,
                }
            );
            commit('updateTransactions', transactions.data);
        },
        async getAllTransactions({ commit }) {
            const user = firebase.auth().currentUser;
            const transactions = await axios.post(
                'http://localhost:5000/transactions/all',
                {
                    userId: user.uid,
                }
            );
            commit('updateAllTransactions', transactions.data);
        },

        // get latest tickets
        // get all tickets
        async getAllTickets({ commit }) {
            const user = firebase.auth().currentUser;
            const tickets = await axios.post(
                'http://localhost:5000/tickets/all',
                {
                    userId: user.uid,
                }
            );
            console.log(tickets.data);
            commit('updateAllTickets', tickets.data);
        },
    },
    modules: {},
});
