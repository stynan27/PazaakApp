// @ is an alias to /src

import PlayerHeader from '@/components/PazaakGame/GameArea/PlayerArea/PlayerHeader/index'
import OpponentHeader from '@/components/PazaakGame/GameArea/OpponentArea/OpponentHeader/index'
import PlayerScore from '@/components/PazaakGame/GameArea/PlayerArea/PlayerScore/index'
import OpponentScore from '@/components/PazaakGame/GameArea/OpponentArea/OpponentScore/index'
import PlayerRoundsWon from '@/components/PazaakGame/GameArea/PlayerArea/PlayerRoundsWon/index'
import OpponentRoundsWon from '@/components/PazaakGame/GameArea/OpponentArea/OpponentRoundsWon/index'
import PlayerCardArea from '@/components/PazaakGame/GameArea/PlayerArea/PlayerCardArea/index'
import OpponentCardArea from '@/components/PazaakGame/GameArea/OpponentArea/OpponentCardArea/index'
import MatchStatusDialog from '@/components/widgets/MatchStatusDialog/index'

export default {
  name: 'GameArea',
  components: {
    PlayerHeader,
    OpponentHeader,
    PlayerScore,
    OpponentScore,
    PlayerRoundsWon,
    OpponentRoundsWon,
    OpponentCardArea,
    PlayerCardArea,
    MatchStatusDialog,
  },
}