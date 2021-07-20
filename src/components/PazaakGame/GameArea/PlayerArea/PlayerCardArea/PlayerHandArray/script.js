// @ is an alias to /src

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerHandArray',
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