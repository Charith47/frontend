import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showAppBars:false,
    isEmailVerified: false,
  },
  mutations: {
    showAppBars: state=>{
      state.showAppBars = true;
    },
    hideAppBars: state=>{
      state.showAppBars = false;
    },
    setEmailVerified: state=>{
      state.isEmailVerified = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
