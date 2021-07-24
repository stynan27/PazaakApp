import { mapGetters } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentHandArray',
  components: {
    PazaakCard,
  },
  computed: {
    ...mapGetters({
      opponentHand: 'OPPONENT_HAND',
    }),
    opponentHandLength() {
      return this.opponentHand.length;
    },
  },
}