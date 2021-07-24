import { mapGetters } from 'vuex';

export default {
  name: 'PlayerRoundsWon',
  computed: {
    ...mapGetters({
      playerRoundsWon: 'PLAYER_ROUNDS_WON',
    }),
  },
}