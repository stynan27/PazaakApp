import Vue from 'vue'
import Router from 'vue-router'

import MainMenu from '@/components/MainMenu/index'
import PazaakGame from '@/components/PazaakGame/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/pazaak-game',
      name: 'PazaakGame',
      component: PazaakGame
    },
  ]
})