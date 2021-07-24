import { mapGetters } from 'vuex';

export default {
  name: 'OpponentHeader',
  computed: {
    ...mapGetters({
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
    }),
  },
}