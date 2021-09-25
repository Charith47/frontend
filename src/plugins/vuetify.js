import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				//primary: '#fca311',
				//u_light_gray: 'f7f7f7',
				//u_deep_blue: '#14213D',
				primary: '#9155FD',
				accent: '#0d6efd',
				secondary: '#8A8D93',
				success: '#56CA00',
				info: '#16B1FF',
				warning: '#FFB400',
				error: '#FF4C51',
			},
		},
	},
});
