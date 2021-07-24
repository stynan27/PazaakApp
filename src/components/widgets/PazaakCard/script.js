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
        case 'plus' || '+/- plus':
          return 'plus-card-background';
        case 'minus' || '+/- minus':
          return 'minus-card-background';
        default:
          return 'special-card-background';
      }
    },
    backgroundGradientColor() {
      return this.backgroundColor + '-gradient';
    },
  },
}