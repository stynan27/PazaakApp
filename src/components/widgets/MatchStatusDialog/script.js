import { mapGetters } from 'vuex';

export default {
  name: 'MatchStatusDialog',
  computed: {
    ...mapGetters({
      displayDialog: 'APP_DISPLAY_DIALOG',
      dialogType: 'APP_DIALOG_TYPE',
      playerName: 'PLAYER_NAME',
      playerRoundsWon: 'PLAYER_ROUNDS_WON',
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
}