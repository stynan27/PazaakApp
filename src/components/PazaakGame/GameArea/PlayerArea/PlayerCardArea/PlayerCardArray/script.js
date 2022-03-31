import { mapGetters, mapActions } from 'vuex';

import PazaakCard from '@/components/widgets/PazaakCard';

import { playSoundEffect } from '../../../../../../utils/SoundEffects';

export default {
  name: 'PlayerCardArray',
  components: {
    PazaakCard,
  },
  watch: {
    playerCardArray(newCardArray, oldCardArray) {
      if (
        newCardArray &&
        newCardArray.length &&
        newCardArray.length !== oldCardArray.length
        ) {
        this.playerUpdateScore();
        const lastPlayed = newCardArray[newCardArray.length-1]['cardType'];
        lastPlayed !== 'basic' ? 
          playSoundEffect('special') : this.playerScore > 20 ? 
            playSoundEffect('bust') : playSoundEffect('hit');
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
      playerScore: 'PLAYER_SCORE',
    }),
    playerCardArrayLength() {
      return this.playerCardArray.length;
    },
  },
}