import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Router from 'vue-router'

import App from './App/index';
import routes from './router/routes';

Vue.use(Vuetify);
Vue.use(Router);

new Vue({
  vuetify: new Vuetify({}),
  router: new Router(routes),
  render: h => h(App)
}).$mount('#app')