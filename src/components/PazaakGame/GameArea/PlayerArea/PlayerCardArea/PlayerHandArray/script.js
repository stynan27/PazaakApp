import { mapGetters } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerHandArray',
  components: {
    PazaakCard,
  },
  computed: {
    ...mapGetters({
      playerHand: 'PLAYER_HAND',
    }),
    playerHandLength() {
      return this.playerHand.length;
    },
  },
}