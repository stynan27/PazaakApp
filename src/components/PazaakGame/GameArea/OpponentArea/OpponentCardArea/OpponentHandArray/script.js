import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentHandArray',
  components: {
    PazaakCard,
  },
  methods: {
    ...mapActions({
      opponentUseSpecial: 'OPPONENT_USE_SPECIAL',
    }),
    isCardAvailable(cardIndex) {
      return this.opponentHand[cardIndex] ? true : false;
    },
  },
  computed: {
    ...mapGetters({
      opponentHand: 'OPPONENT_HAND',
    }),
  },
}