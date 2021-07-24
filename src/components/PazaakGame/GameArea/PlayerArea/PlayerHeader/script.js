import { mapGetters } from 'vuex';

export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters({
      isPlayerTurn: 'APP_IS_PLAYER_TURN',
    }),
  },
}