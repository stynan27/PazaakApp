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
      resetOpponentHandUsed: 'OPPONENT_HAND_USED_SET',
      resetPlayerHandUsed: 'PLAYER_HAND_USED_SET',
      updatePlayerTurn: 'APP_IS_PLAYER_TURN_SET',
    }),
    ...mapActions({
      hitOpponent: 'DEALER_HIT_OPPONENT',
      hitPlayer: 'DEALER_HIT_PLAYER',
    }),
    endTurn() {
      this.isPlayerTurn ? this.hitPlayer() : this.hitOpponent();
      this.updatePlayerTurn(!this.isPlayerTurn);
      // reset player/opponent handUsed
      this.resetOpponentHandUsed(false);
      this.resetPlayerHandUsed(false);
    },
  },
  computed: {
    ...mapGetters({
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
    }),
  }
}