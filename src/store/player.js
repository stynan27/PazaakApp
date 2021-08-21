import { interpretArrayScore,shuffleDeck } from '../utils/CardHelper';

export default {
  state: {
    cardArray: [],
    hand: [],
    roundsWon: 0,
    score: 0,
    sideDeck: [
      {cardType: 'plus', cardValue: '1'},
      {cardType: 'minus', cardValue: '2'},
      {cardType: 'double', cardValue: 'D'},
      {cardType: 'plus', cardValue: '3'},
      {cardType: 'plus', cardValue: '4'},
      {cardType: 'minus', cardValue: '4'},
      {cardType: 'plus', cardValue: '6'},
      {cardType: 'minus', cardValue: '1'},
      {cardType: 'minus', cardValue: '6'},
      {cardType: 'minus', cardValue: '3'},
    ],
  },
  getters: {
    PLAYER_CARD_ARRAY(state) {
      return state.cardArray;
    },
    PLAYER_HAND(state) {
      return state.hand;
    },
    PLAYER_ROUNDS_WON(state) {
      return state.roundsWon;
    },
    PLAYER_SCORE(state) {
      return state.score;
    },
    PLAYER_SIDE_DECK(state) {
      return state.sideDeck;
    },
  },
  mutations: {
    PLAYER_CARD_ARRAY_SET(state, value) {
      console.log(value)
      state.cardArray = value;
    },
    PLAYER_HAND_SET(state, value) {
      state.hand = value;
    },
    PLAYER_ROUNDS_WON_SET(state, value) {
      state.roundsWon = value;
    },
    PLAYER_SCORE_SET(state, value) {
      state.score = value;
    },
    PLAYER_SIDE_DECK(state, value) {
      state.sideDeck = value;
    },
  },
  actions: {
    PLAYER_DRAW_HAND({ state, commit }) {
      const sideDeck = state.sideDeck;
      // draw first 4 for hand from shuffled sideDeck
      commit('PLAYER_HAND_SET', shuffleDeck(sideDeck).slice(0, 4));
    },
    PLAYER_UPDATE_SCORE({ state, commit }) {
      const updatedScoreWithCards = interpretArrayScore(state.cardArray);
      const score = updatedScoreWithCards.pop(); 
      if (score) {
        commit('PLAYER_SCORE_SET', score);
      }
      const arrayLength = updatedScoreWithCards.length-1;
      const updatedCardArray = updatedScoreWithCards.splice(0, arrayLength-1);
      if (updatedCardArray.length) {
        commit('PLAYER_CARD_ARRAY_SET', updatedScoreWithCards);
      }
    }
  },
};