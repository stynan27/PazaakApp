import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';

import App from './App/index';

import MainMenu from '@/components/MainMenu/index'
import PazaakGame from '@/components/PazaakGame/index'

const routes = [
  { path: '/', component: MainMenu },
  { path: '/game', component: PazaakGame }
]

const router = new VueRouter({
  routes // short for `routes: routes`
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
