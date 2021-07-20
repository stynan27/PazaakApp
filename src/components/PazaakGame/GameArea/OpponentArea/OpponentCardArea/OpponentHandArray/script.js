import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'OpponentHandArray',
  components: {
    PazaakCard,
  },
  computed: {
    cardArrayLength() {
      return this.cardArray.length;
    },
  },
  data() {
    return {
      cardArray: [],
    }
  }
}