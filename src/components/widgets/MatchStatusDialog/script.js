export default {
  name: 'MatchStatusDialog',
  props: {
    dialogType: {
      type: String,
      default: 'win'
    },
    displayDialog: {
      type: Boolean,
      default: true
    },
    playerName: {
      type: String,
      default: 'Player'
    },
    opponentName: {
      type: String,
      default: 'Opponent'
    }
  },
  computed: {
    dialogText() {
      if(this.dialogType === 'win') {
        return this.playerName.toUpperCase() + ' WINS THE SET.';
      } else if(this.dialogType === 'loss') {
        return this.opponentName.toUpperCase() + ' WINS THE SET.';
      } else {
        return 'ARE YOU SURE YOU WANT TO FORFEIT THE MATCH?';
      }
    },
  },
  data() {
    return {
      displayDialog: false,
    };
  }
}