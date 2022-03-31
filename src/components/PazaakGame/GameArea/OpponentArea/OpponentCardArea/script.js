import { mapGetters, mapMutations, mapActions } from 'vuex';

import OpponentCardArray from '@/components/PazaakGame/GameArea/OpponentArea/OpponentCardArea/OpponentCardArray'
import OpponentHandArray from '@/components/PazaakGame/GameArea/OpponentArea/OpponentCardArea/OpponentHandArray'

import { playSoundEffect } from '../../../../../utils/SoundEffects';

export default {
  name: 'OpponentCardArea',
  components: {
    OpponentCardArray,
    OpponentHandArray
  },
  methods: {
    ...mapMutations({
      opponentStandingSet: 'OPPONENT_IS_STANDING_SET',
      playerStandingSet: 'PLAYER_IS_STANDING_SET',
      resetOpponentHandUsed: 'OPPONENT_HAND_USED_SET',
      resetPlayerHandUsed: 'PLAYER_HAND_USED_SET',
      updatePlayerTurn: 'APP_IS_PLAYER_TURN_SET',
    }),
    ...mapActions({
      determineWinner: 'APP_DETERMINE_ROUND_WINNER',
      displayDialog: 'APP_DISPLAY_DIALOG',
      incrPlayerRoundsWon: 'PLAYER_INCREMENT_ROUNDS_WON',
      incrOpponentRoundsWon: 'OPPONENT_INCREMENT_ROUNDS_WON',
      hitOpponent: 'DEALER_HIT_OPPONENT',
      hitPlayer: 'DEALER_HIT_PLAYER',
    }),
    async endTurn() {
      // TODO: make below into a store function?
      await this.determineWinner().then(async (winner) => {
        if (winner !== 'none') {
          if (winner === 'playerWin') {
            await this.incrPlayerRoundsWon();
            this.playerRoundsWon === 3 ? playSoundEffect('matchWon') : playSoundEffect('roundWon');
            playSoundEffect('roundWon');
            this.displayDialog({ dialogType: winner });
          } else if (winner === 'opponentWin') {
            await this.incrOpponentRoundsWon();
            this.opponentRoundsWon === 3 ? playSoundEffect('matchLoss') : playSoundEffect('roundLoss');
            this.displayDialog({ dialogType: winner });
          } else if (winner === 'tie') {
            playSoundEffect('tie');
            this.incrPlayerRoundsWon();
            this.incrOpponentRoundsWon();
            this.displayDialog({ dialogType: winner });
          }
          // reset player/opponent isStanding
          this.playerStandingSet(false);
          this.opponentStandingSet(false);

          // reset player/opponent handUsed
          this.resetOpponentHandUsed(false);
          this.resetPlayerHandUsed(false);
        } else {
          if (this.playerIsStanding) {
            this.hitOpponent();
            this.updatePlayerTurn(false);
          } else if (this.opponentIsStanding) {
            this.hitPlayer();
            this.updatePlayerTurn(true);
          } else {
            !this.isPlayerTurn ? this.hitPlayer() : this.hitOpponent();
            this.updatePlayerTurn(!this.isPlayerTurn);
          }
          // reset player/opponent handUsed
          this.resetOpponentHandUsed(false);
          this.resetPlayerHandUsed(false);
        }
      });
    },
    async stand() {
      // set isStanding attribute
      if (this.isPlayerTurn) {
        this.playerStandingSet(true);
      } else {
        this.opponentStandingSet(true);
      }

      this.endTurn();
    },
    forfeit() {
      this.displayDialog({ dialogType: 'forfeit' });
    },
  },
  computed: {
    ...mapGetters({
      opponentIsStanding: 'OPPONENT_IS_STANDING',
      opponentRoundsWon: 'OPPONENT_ROUNDS_WON',
      playerIsStanding: 'PLAYER_IS_STANDING',
      playerRoundsWon: 'PLAYER_ROUNDS_WON',
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
    }),
  }
}