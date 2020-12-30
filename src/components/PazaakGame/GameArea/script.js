// @ is an alias to /src

import PlayerHeader from '@/components/PazaakGame/GameArea/PlayerHeader/index'
import OpponentHeader from '@/components/PazaakGame/GameArea/OpponentHeader/index'
import PlayerScore from '@/components/PazaakGame/GameArea/PlayerScore/index'
import OpponentScore from '@/components/PazaakGame/GameArea/OpponentScore/index'
import PlayerRoundsWon from '@/components/PazaakGame/GameArea/PlayerRoundsWon/index'
import OpponentRoundsWon from '@/components/PazaakGame/GameArea/OpponentRoundsWon/index'
import OpponentGameArea from '@/components/PazaakGame/GameArea/OpponentGameArea/index'
import PlayerGameArea from '@/components/PazaakGame/GameArea/PlayerGameArea/index'

export default {
  name: 'GameArea',
  components: {
    PlayerHeader,
    OpponentHeader,
    PlayerScore,
    OpponentScore,
    PlayerRoundsWon,
    OpponentRoundsWon,
    OpponentGameArea,
    PlayerGameArea
  },
}