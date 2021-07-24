import { mapGetters } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentCardArray',
  components: {
    PazaakCard,
  },
  methods: {
    cardIndex(colNum, rowNum) {
      switch(rowNum) {
        case 1:
          return colNum+rowNum-2;
        case 2:
          return colNum+rowNum;
        case 3:
          return colNum+rowNum+2;
        default:
          return -1;
      }
    }
  },
  computed: {
    ...mapGetters({
      opponentCardArray: 'OPPONENT_CARD_ARRAY',
    }),
    opponentCardArrayLength() {
      return this.opponentCardArray.length;
    },
  },
}