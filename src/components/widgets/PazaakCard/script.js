export default {
  name: 'PazaakCard',
  props: {
    cardType: {
      type: String,
      default: 'basic'
    },
    cardValue: {
      type: String,
      default: '1'
    },
  },
  computed: {
    backgroundColor() {
      switch(this.cardType) {
        case 'basic':
          return 'basic-card-background';
        case 'add':
          return 'add-card-background';
        case 'subtract':
          return 'subtract-card-background';
        default:
          return 'special-card-background';
      }
    },
    backgroundGradientColor() {
      return this.backgroundColor + '-gradient';
    },
  },
}