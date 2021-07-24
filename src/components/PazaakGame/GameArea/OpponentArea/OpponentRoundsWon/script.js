import { mapGetters } from 'vuex';

export default {
  name: 'OpponentRoundsWon',
  computed: {
    ...mapGetters({
      opponentRoundsWon: 'OPPONENT_ROUNDS_WON',
    }),
  },
}