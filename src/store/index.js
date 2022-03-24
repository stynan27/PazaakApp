import Vuex from 'vuex';

import dealer from './dealer';
import player from './player';
import opponent from './opponent';

////// HELPERS //////
// Checks if the current player is over 20 (they lose)
const checkBust = (isPlayerTurn, playerScore, opponentScore) => {
  if (isPlayerTurn) {
    return playerScore > 20 ? 'opponentWin' : 'none';
  } else {
    return opponentScore > 20 ? 'playerWin' : 'none';
  }
};

// Checks if the current player's card array is 9 (they win)
const checkFillTable = (isPlayerTurn, pCardArrayLength, oCardArrayLength) => {
  if (isPlayerTurn) {
    return pCardArrayLength > 8 ? 'playerWin' : 'none';
  } else {
    return oCardArrayLength > 8 ? 'opponentWin' : 'none';
  }
};

const checkOutScore = (pIsStanding, oIsStanding, pScore, oScore) => {
  if (pIsStanding && oIsStanding) {
    if (pScore > oScore) {
      return 'playerWin';
    } else if (pScore < oScore) {
      return 'opponentWin';
    } else {
      return 'tie';
    }
  }
  return 'none';
};


function createStore() {
  return new Vuex.Store({
    state:{
      displayDialog: false,
      dialogType: '',
      isPlayerTurn: true,
    },
    modules: {
      dealer,
      player,
      opponent,
    },
    getters: {
      APP_DISPLAY_DIALOG(state) {
        return state.displayDialog;
      },
      APP_DIALOG_TYPE(state) {
        return state.dialogType;
      },
      APP_IS_PLAYER_TURN(state) {
        return state.isPlayerTurn;
      },
    },
    mutations: {
      APP_DISPLAY_DIALOG_SET(state, value) {
        state.displayDialog = value;
      },
      APP_DIALOG_TYPE_SET(state, value) {
        state.dialogType = value;
      },
      APP_IS_PLAYER_TURN_SET(state, value) {
        state.isPlayerTurn = value;
      },
    },
    actions: {
      APP_CLOSE_DIALOG({ commit }) {
        commit('APP_DIALOG_TYPE_SET', '');
        commit('APP_DISPLAY_DIALOG_SET', false);
      },
      // validates if a win condition has occured
      // returns true if it has
      APP_DETERMINE_ROUND_WINNER({ state, getters }) {
        let winner = 'none';
        // 1.) Bust: Did the current player/opponent END or STAND over 20? 
        // -> other player wins
        winner = checkBust(state.isPlayerTurn, getters.PLAYER_SCORE, getters.OPPONENT_SCORE);
        if (winner !== 'none') {
          return winner;
        }
        // 2.) Filling the Table: Filled all card array slots (without Bust over 20)
        winner = checkFillTable(state.isPlayerTurn, getters.PLAYER_CARD_ARRAY.length, getters.OPPONENT_CARD_ARRAY.length);
        if (winner !== 'none') {
          return winner;
        }
        // 3.) Outscore: did the previous player and current player STAND? 
        // -> if so check for highest score (without bust)
        winner = checkOutScore(getters.PLAYER_IS_STANDING, getters.OPPONENT_IS_STANDING, getters.PLAYER_SCORE, getters.OPPONENT_SCORE);
        return winner;
      },
      APP_DISPLAY_DIALOG({ commit }, { dialogType }) {
        commit('APP_DIALOG_TYPE_SET', dialogType);
        commit('APP_DISPLAY_DIALOG_SET', true);
      },
      APP_END_MATCH({ state }, router) {
        state.displayDialog = false;
        // TODO: handle match disconnection... dialogs?

        // redirect to main menu
        router.push('/');
      },
      // TODO: setup connection to server/perform fetches/commit defaults to modules
      // i.e. 
      // INITIALIZE({ commit, dispatch, getters }) {
        // fetch all store data
      // }
      APP_HOST_MATCH({ dispatch }, router) {
        // Randomize/draw cards
        dispatch('DEALER_SHUFFLE_DECK');
        dispatch('PLAYER_DRAW_HAND');
        dispatch('OPPONENT_DRAW_HAND');

        // TODO: contact opponent to update their session (ws?)

        // redirect to game
        router.push('pazaak-game');

        // hit player (TODO: determine who or based on host?)
        setTimeout(() => { dispatch('DEALER_HIT_PLAYER'); }, 300);
      },
      // APP_JOIN_MATCH({ commit, dispatch, getters }) {

      // },
      APP_RESET_ROUND({ dispatch }) {
        dispatch('PLAYER_RESET_ROUND');
        dispatch('OPPONENT_RESET_ROUND');
      },
    },
  });
}

export default createStore;