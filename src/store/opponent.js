import { interpretArrayScore, shuffleDeck } from '../utils/CardHelper';

export default {
  state: {
    cardArray: [],
    hand: [],
    roundsWon: 0,
    score: 0,
    sideDeck: [
      {cardType: 'minus', cardValue: '4'},
      {cardType: 'plus', cardValue: '4'},
      {cardType: 'plus', cardValue: '1'},
      {cardType: 'plus', cardValue: '2'},
      {cardType: 'plus', cardValue: '3'},
      {cardType: 'plus', cardValue: '5'},
      {cardType: 'plus', cardValue: '6'},
      {cardType: 'minus', cardValue: '2'},
      {cardType: 'minus', cardValue: '1'},
      {cardType: 'minus', cardValue: '3'},
    ],
  },
  getters: {
    OPPONENT_CARD_ARRAY(state) {
      return state.cardArray;
    },
    OPPONENT_HAND(state) {
      return state.hand;
    },
    OPPONENT_ROUNDS_WON(state) {
      return state.roundsWon;
    },
    OPPONENT_SCORE(state) {
      return state.score;
    },
    OPPONENT_SIDE_DECK(state) {
      return state.sideDeck;
    },
  },
  mutations: {
    OPPONENT_CARD_ARRAY_SET(state, value) {
      state.cardArray = value;
    },
    OPPONENT_HAND_SET(state, value) {
      state.hand = value;
    },
    OPPONENT_ROUNDS_WON_SET(state, value) {
      state.roundsWon = value;
    },
    OPPONENT_SCORE_SET(state, value) {
      state.score = value;
    },
    OPPONENT_SIDE_DECK(state, value) {
      state.sideDeck = value;
    },
  },
  actions: {
    OPPONENT_DRAW_HAND({ state, commit }) {
      const sideDeck = state.sideDeck;
      // draw first 4 for hand from shuffled sideDeck
      commit('OPPONENT_HAND_SET', shuffleDeck(sideDeck).slice(0, 4));
    },
    OPPONENT_UPDATE_SCORE({ state, commit }) {
      const updatedScoreWithCards = interpretArrayScore(state.cardArray);
      const score = updatedScoreWithCards.pop(); 
      if (score) {
        commit('OPPONENT_SCORE_SET', score);
      }
      const arrayLength = updatedScoreWithCards.length-1;
      const updatedCardArray = updatedScoreWithCards.splice(0, arrayLength-1);
      if (updatedCardArray.length) {
        commit('OPPONENT_CARD_ARRAY_SET', updatedScoreWithCards);
      }
    }
  },
};