// @ is an alias to /src

import PazaakCard from '@/components/widgets/PazaakCard';

export default {
  name: 'PlayerCardArray',
  components: {
    PazaakCard,
  },
  data() {
    return {
      currentSlot: { col: 1, row: 1,  }
    }
  }
}