import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#9155FD',
                accent: '#0d6efd',
                secondary: '#545659',
                success: '#56CA00',
                info: '#16B1FF',
                warning: '#FFB400',
                error: '#FF4C51',
            },
        },
    },
});
