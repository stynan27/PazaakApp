import MainMenu from '@/components/MainMenu/index'
import PazaakGame from '@/components/PazaakGame/index'

export default {
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
}