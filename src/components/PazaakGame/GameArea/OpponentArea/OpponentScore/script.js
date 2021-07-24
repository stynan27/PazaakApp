import { mapGetters } from 'vuex';

export default {
  name: 'OpponentScore',
  computed: {
    ...mapGetters({
      opponentScore: 'OPPONENT_SCORE',
    }),
  },
}