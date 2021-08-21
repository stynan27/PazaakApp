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
    previouslyPlayed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cardAddHover() {
      this.isActive = true;
    },
    cardRemoveHover() {
      this.isActive = false;
    },
  },
  computed: {
    backgroundColor() {
      switch(this.cardType) {
        case 'basic':
          return 'basic-card-background';
        case 'plus':
        case '+/- plus':
          return 'plus-card-background';
        case 'minus':
        case '+/- minus':
          return 'minus-card-background';
        default:
          return 'special-card-background';
      }
    },
    backgroundGradientColor() {
      return this.backgroundColor + '-gradient';
    },
    cardHoverStyle() {
      if (this.isActive) {
        if (this.previouslyPlayed) {
          return 'pazaak-card-played-hover';
        } else {
          return 'pazaak-card-special-hover';
        }
      }
      return '';
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
}