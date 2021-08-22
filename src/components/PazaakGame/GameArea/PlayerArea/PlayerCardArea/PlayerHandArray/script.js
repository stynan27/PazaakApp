import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerHandArray',
  components: {
    PazaakCard,
  },
  methods: {
    ...mapActions({
      playerUseSpecial: 'PLAYER_USE_SPECIAL',
    }),
    isCardAvailable(cardIndex) {
      return this.playerHand[cardIndex] ? true : false;
    },
  },
  computed: {
    ...mapGetters({
      playerHand: 'PLAYER_HAND',
    }),
  },
}