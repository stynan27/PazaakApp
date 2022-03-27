import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MatchStatusDialog',
  computed: {
    ...mapGetters({
      displayDialog: 'APP_DISPLAY_DIALOG',
      dialogType: 'APP_DIALOG_TYPE',
      playerName: 'PLAYER_NAME',
      playerRoundsWon: 'PLAYER_ROUNDS_WON',
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
      opponentName: 'OPPONENT_NAME',
      opponentRoundsWon: 'OPPONENT_ROUNDS_WON',
    }),
    dialogText() {
      const status = this.playerRoundsWon === 3 || this.opponentRoundsWon === 3 ? 'MATCH' : 'SET';
      if(this.dialogType === 'playerWin') {
        return this.playerName.toUpperCase() + ' WINS THE ' + status + '.';
      } else if(this.dialogType === 'opponentWin') {
        return this.opponentName.toUpperCase() + ' WINS THE ' + status + '.';
      } else {
        return 'ARE YOU SURE YOU WANT TO FORFEIT THE MATCH?';
      }
    },
  },
  methods: {
    ...mapActions({
      closeDialog: 'APP_CLOSE_DIALOG',
      determineRoundWinner: 'APP_DETERMINE_ROUND_WINNER',
      endMatch: 'APP_END_MATCH',
      hitOpponent: 'DEALER_HIT_OPPONENT',
      hitPlayer: 'DEALER_HIT_PLAYER',
      resetRound: 'APP_RESET_ROUND',
    }),
    ...mapMutations({
      dialogTypeSet: 'APP_DIALOG_TYPE_SET',
      opponentRoundsWonSet: 'OPPONENT_ROUNDS_WON_SET',
      playerRoundsWonSet: 'PLAYER_ROUNDS_WON_SET',
      updatePlayerTurn: 'APP_IS_PLAYER_TURN_SET',
    }),
    cancel() {
      this.closeDialog();
    },
    forfeit() {
      this.isPlayerTurn ? this.opponentRoundsWonSet(3) : this.playerRoundsWonSet(3);
      const winnerType = this.isPlayerTurn ? 'opponentWin' : 'playerWin';
      this.dialogTypeSet(winnerType);
    },
    async ok() {
      if (this.playerRoundsWon === 3 || this.opponentRoundsWon === 3) {
        this.endMatch(this.$router);
      }
      await this.resetRound();
      if (this.dialogType === 'playerWin') {
        this.updatePlayerTurn(false);
        this.hitOpponent();
      } else {
        this.updatePlayerTurn(true);
        this.hitPlayer();
      }
      this.closeDialog();
    },
  },
}