import { shuffleDeck } from '../utils/CardHelper';

export default {
  state: {
    deck: [
      {cardType: 'basic', cardValue: '1'}, {cardType: 'basic', cardValue: '1'}, {cardType: 'basic', cardValue: '1'}, {cardType: 'basic', cardValue: '1'},
      {cardType: 'basic', cardValue: '2'}, {cardType: 'basic', cardValue: '2'}, {cardType: 'basic', cardValue: '2'}, {cardType: 'basic', cardValue: '2'},
      {cardType: 'basic', cardValue: '3'}, {cardType: 'basic', cardValue: '3'}, {cardType: 'basic', cardValue: '3'}, {cardType: 'basic', cardValue: '3'},
      {cardType: 'basic', cardValue: '4'}, {cardType: 'basic', cardValue: '4'}, {cardType: 'basic', cardValue: '4'}, {cardType: 'basic', cardValue: '4'},
      {cardType: 'basic', cardValue: '5'}, {cardType: 'basic', cardValue: '5'}, {cardType: 'basic', cardValue: '5'}, {cardType: 'basic', cardValue: '5'},
      {cardType: 'basic', cardValue: '6'}, {cardType: 'basic', cardValue: '6'}, {cardType: 'basic', cardValue: '6'}, {cardType: 'basic', cardValue: '6'},
      {cardType: 'basic', cardValue: '7'}, {cardType: 'basic', cardValue: '7'}, {cardType: 'basic', cardValue: '7'}, {cardType: 'basic', cardValue: '7'},
      {cardType: 'basic', cardValue: '8'}, {cardType: 'basic', cardValue: '8'}, {cardType: 'basic', cardValue: '8'}, {cardType: 'basic', cardValue: '8'},
      {cardType: 'basic', cardValue: '9'}, {cardType: 'basic', cardValue: '9'}, {cardType: 'basic', cardValue: '9'}, {cardType: 'basic', cardValue: '9'},
      {cardType: 'basic', cardValue: '10'}, {cardType: 'basic', cardValue: '10'}, {cardType: 'basic', cardValue: '10'}, {cardType: 'basic', cardValue: '10'},
    ],
  },
  getters: {
    DEALER_DECK(state) {
      return state.deck;
    },
  },
  mutations: {
    DEALER_DECK_SET(state, value) {
      state.deck = value;
    },
  },
  actions: {
    DEALER_SHUFFLE_DECK({ state, commit }) {
      const deck = state.deck;
      // draw first 4 for hand from shuffled sideDeck
      commit('DEALER_DECK_SET', shuffleDeck(deck));
    },
    DEALER_HIT_PLAYER({ state, commit, getters }) {
      // TODO: reset deck at end of round
      const deckSize = state.deck.length;
      const topCard = state.deck[deckSize-1];
      // append topCard to player card array, then commit new array
      let playerCardArray = getters.PLAYER_CARD_ARRAY.concat(topCard);
      commit('PLAYER_CARD_ARRAY_SET', playerCardArray);
      // pop from deck
      state.deck.pop()
      // commit('DEALER_DECK_SET', state.DEALER_DECK.pop());
    },
    DEALER_HIT_OPPONENT({ state, commit, getters }) {
      // TODO: reset deck at end of round
      const deckSize = state.deck.length;
      const topCard = state.deck[deckSize-1];
      // append topCard to player card array, then commit new array
      let opponentCardArray = getters.OPPONENT_CARD_ARRAY.concat(topCard);
      commit('OPPONENT_CARD_ARRAY_SET', opponentCardArray);
      // pop from deck
      state.deck.pop()
      // commit('DEALER_DECK_SET', state.DEALER_DECK.pop());
      // console.log('playerCardArray', getters.OPPONENT_CARD_ARRAY, 'deck length', state.deck.length);
    }
  },
};