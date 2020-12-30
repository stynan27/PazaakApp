// @ is an alias to /src

import PlayerHeader from '@/components/PazaakGame/GameArea/PlayerHeader/index'
import OpponentGameArea from '@/components/PazaakGame/GameArea/OpponentGameArea/index'
import PlayerGameArea from '@/components/PazaakGame/GameArea/PlayerGameArea/index'

export default {
  name: 'GameArea',
  components: {
    PlayerHeader,
    OpponentGameArea,
    PlayerGameArea
  },
}