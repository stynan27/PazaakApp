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
    cardArrayLength() {
      return this.cardArray.length;
    },
  },
  data() {
    return {
      cardArray: [ 
        { cardType: 'basic', cardValue: '7' },
        { cardType: 'basic', cardValue: '9' },
      ],
    }
  }
}