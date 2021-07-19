// @ is an alias to /src

// import PlayerHandArray from '@/components/PazaakGame/GameArea/PlayerGameArea/PlayerHandArray/index'

export default {
  name: 'PazaakCard',
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
  data() {
    return {
      cardType: 'subtract',
      cardValue: '-1',
    }
  },
}