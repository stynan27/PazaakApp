import { interpretArrayScore, shuffleDeck } from '../utils/CardHelper';

export default {
  state: {
    name: 'Opponent',
    cardArray: [],
    hand: [],
    handUsed: false,
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
    isStanding: false,
  },
  getters: {
    OPPONENT_NAME(state) {
      return state.name;
    },
    OPPONENT_CARD_ARRAY(state) {
      return state.cardArray;
    },
    OPPONENT_HAND(state) {
      return state.hand;
    },
    OPPONENT_HAND_USED(state) {
      return state.handUsed;
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
    OPPONENT_IS_STANDING(state) {
      return state.isStanding;
    },
  },
  mutations: {
    OPPONENT_NAME_SET(state, value) {
      state.name = value;
    },
    OPPONENT_CARD_ARRAY_SET(state, value) {
      state.cardArray = value;
    },
    OPPONENT_HAND_SET(state, value) {
      state.hand = value;
    },
    OPPONENT_HAND_USED_SET(state, value) {
      state.handUsed = value;
    },
    OPPONENT_ROUNDS_WON_SET(state, value) {
      state.roundsWon = value;
    },
    OPPONENT_SCORE_SET(state, value) {
      state.score = value;
    },
    OPPONENT_SIDE_DECK_SET(state, value) {
      state.sideDeck = value;
    },
    OPPONENT_IS_STANDING_SET(state, value) {
      state.isStanding = value;
    },
  },
  actions: {
    OPPONENT_DRAW_HAND({ state, commit }) {
      const sideDeck = state.sideDeck;
      // draw first 4 for hand from shuffled sideDeck
      commit('OPPONENT_HAND_SET', shuffleDeck(sideDeck).slice(0, 4));
    },
    OPPONENT_INCREMENT_ROUNDS_WON({ state, commit }) { 
      commit('OPPONENT_ROUNDS_WON_SET', state.roundsWon + 1);
    },
    OPPONENT_RESET_ROUND({ commit }) {
      commit('OPPONENT_SCORE_SET', 0);
      commit('OPPONENT_CARD_ARRAY_SET', []);
    },
    OPPONENT_UPDATE_SCORE({ state, commit }) {
      const updatedScoreWithCards = interpretArrayScore(state.cardArray);
      const score = updatedScoreWithCards.pop(); 
      if (score) {
        commit('OPPONENT_SCORE_SET', score);
      }
      const updatedCardArray = updatedScoreWithCards.slice();
      if (updatedCardArray.length) {
        commit('OPPONENT_CARD_ARRAY_SET', updatedScoreWithCards);
      }
    },
    OPPONENT_USE_SPECIAL({ state, commit, getters }, { cardIndex, cardAvailable }) {
      // only allow special when it's Opponent turn & no special card used
      const isOpponentTurn = !getters.APP_IS_PLAYER_TURN;
      if (isOpponentTurn && cardAvailable && !state.handUsed) {
        const selectedCard = state.hand[cardIndex];

        // remove card from hand
        let hand = state.hand.slice();
        hand[cardIndex] = null;
        commit('OPPONENT_HAND_SET', hand);

        // append selectedCard to card array
        const opponentCardArray = getters.OPPONENT_CARD_ARRAY.concat(selectedCard);
        commit('OPPONENT_CARD_ARRAY_SET', opponentCardArray);

        commit('OPPONENT_HAND_USED_SET', true);
      }
    },
  },
};