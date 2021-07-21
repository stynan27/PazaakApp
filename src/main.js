import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Router from 'vue-router'
import Plus from 'vue-material-design-icons/Plus.vue';
import Minus from 'vue-material-design-icons/Minus.vue';

import App from './App/index';
import routes from './router/routes';

Vue.use(Vuetify);
Vue.use(Router);

Vue.component('add-icon', Plus);
Vue.component('minus-icon', Minus);

new Vue({
  vuetify: new Vuetify({}),
  router: new Router(routes),
  render: h => h(App)
}).$mount('#app')