import { mapGetters } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentHandArray',
  components: {
    PazaakCard,
  },
  computed: {
    ...mapGetters({
      opponentSideDeck: 'OPPONENT_SIDE_DECK',
    }),
    opponentSideDeckLength() {
      return this.opponentSideDeck.length;
    },
  },
}