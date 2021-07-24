import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerCardArray',
  components: {
    PazaakCard,
  },
  watch: {
    playerCardArray(newCardArray) {
      if (newCardArray && newCardArray.length) {
        this.playerUpdateScore();
      }
    }
  },
  methods: {
    ...mapActions({
      playerUpdateScore: 'PLAYER_UPDATE_SCORE',
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
      playerCardArray: 'PLAYER_CARD_ARRAY',
    }),
    playerCardArrayLength() {
      return this.playerCardArray.length;
    },
  },
}