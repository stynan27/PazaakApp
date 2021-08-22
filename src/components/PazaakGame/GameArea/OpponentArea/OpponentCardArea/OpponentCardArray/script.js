import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentCardArray',
  components: {
    PazaakCard,
  },
  watch: {
    opponentCardArray(newCardArray, oldCardArray) {
      if (
        newCardArray &&
        newCardArray.length &&
        newCardArray.length !== oldCardArray.length
      ) {
        this.opponentUpdateScore();
      }
    }
  },
  methods: {
    ...mapActions({
      opponentUpdateScore: 'OPPONENT_UPDATE_SCORE',
    }),
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