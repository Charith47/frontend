import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes:{
            light:{
                u_orange: '#fca311',
                u_light_gray: 'f7f7f7',
                u_deep_blue: '#14213D'
            }
        }
    }
});
