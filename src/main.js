import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Router from 'vue-router'
import Vuex from 'vuex';

// material design icons
import Plus from 'vue-material-design-icons/Plus.vue';
import Minus from 'vue-material-design-icons/Minus.vue';

import App from '@/App/index';
import routes from '@/router/routes';
import store from '@/store'

Vue.use(Vuetify);
Vue.use(Router);
Vue.use(Vuex);

Vue.component('plus-icon', Plus);
Vue.component('minus-icon', Minus);

new Vue({
  vuetify: new Vuetify({}),
  router: new Router(routes),
  store,
  render: h => h(App)
}).$mount('#app')
