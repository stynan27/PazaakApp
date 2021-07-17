import Vue from 'vue';
import vuetify from './plugins/vuetify';

import App from './App/index';
import router from './router/routes';


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')