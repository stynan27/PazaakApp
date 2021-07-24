import { mapGetters } from 'vuex';

export default {
  name: 'PlayerScore',
  computed: {
    ...mapGetters({
      playerScore: 'PLAYER_SCORE',
    }),
  },
}