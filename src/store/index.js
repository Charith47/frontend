import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showAppBars: false,
        walletAmount: 0,
        isEmailVerified: false,
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
            console.log(trueAmount);
            console.log(state.walletAmount);
        },
        addMoney: (state, rechargeAmount) => {
            state.walletAmount += rechargeAmount;
        },
        spendMoney: (state, spendAmount) => {
            state.walletAmount -= spendAmount;
        },
    },
    modules: {},
});
