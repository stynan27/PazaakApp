import { mapGetters, mapMutations, mapActions } from 'vuex';

import OpponentCardArray from '@/components/PazaakGame/GameArea/OpponentArea/OpponentCardArea/OpponentCardArray'
import OpponentHandArray from '@/components/PazaakGame/GameArea/OpponentArea/OpponentCardArea/OpponentHandArray'

export default {
  name: 'OpponentCardArea',
  components: {
    OpponentCardArray,
    OpponentHandArray
  },
  methods: {
    ...mapMutations({
      updatePlayerTurn: 'APP_IS_PLAYER_TURN_SET',
    }),
    ...mapActions({
      hitPlayer: 'DEALER_HIT_PLAYER',
      hitOpponent: 'DEALER_HIT_OPPONENT',
    }),
    endTurn() {
      this.isPlayerTurn ? this.hitPlayer() : this.hitOpponent();
      this.updatePlayerTurn(!this.isPlayerTurn);
    },
  },
  computed: {
    ...mapGetters({
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
    }),
  }
}