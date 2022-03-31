import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

import { playSoundEffect } from '../../../../../../utils/SoundEffects';

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
        const lastPlayed = newCardArray[newCardArray.length-1]['cardType'];
        lastPlayed !== 'basic' ? 
          playSoundEffect('special') : this.opponentScore > 20 ? 
            playSoundEffect('bust') : playSoundEffect('hit');
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
      opponentScore: 'OPPONENT_SCORE',
    }),
    opponentCardArrayLength() {
      return this.opponentCardArray.length;
    },
  },
}