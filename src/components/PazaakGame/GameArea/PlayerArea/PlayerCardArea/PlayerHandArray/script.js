import { mapGetters } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerHandArray',
  components: {
    PazaakCard,
  },
  computed: {
    ...mapGetters({
      playerSideDeck: 'PLAYER_SIDE_DECK',
    }),
    playerSideDeckLength() {
      return this.playerSideDeck.length;
    },
  },
}