import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import axios from 'axios';
import firebase from 'firebase/compat/app';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
	apiKey: 'AIzaSyDFSPET4XyxSkqDarFqq0lW6eLD2vxJHGI',
	authDomain: 'unibus-passenger.firebaseapp.com',
	projectId: 'unibus-passenger',
	storageBucket: 'unibus-passenger.appspot.com',
	messagingSenderId: '123855646851',
	appId: '1:123855646851:web:94f7120112d6069066ebb6',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let app;

firebase.auth().onAuthStateChanged((user) => {
	console.log(user);
	if (!app) {
		app = new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount('#app');
	}
});
