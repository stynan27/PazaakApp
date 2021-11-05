import Vuex from 'vuex';

import dealer from './dealer';
import player from './player';
import opponent from './opponent';

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
    },
  });
}

export default createStore;