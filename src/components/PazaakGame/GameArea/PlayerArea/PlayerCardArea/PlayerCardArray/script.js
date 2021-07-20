import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerCardArray',
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
        { cardType: 'add', cardValue: '+1' },
        { cardType: 'subtract', cardValue: '-9' },
        { cardType: 'special', cardValue: 'D' },
        { cardType: 'basic', cardValue: '6' },
      ],
    }
  }
}