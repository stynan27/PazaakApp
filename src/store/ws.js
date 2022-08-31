// TODO: no need for API due to electron + json storage/retrieval
// INSTEAD: use separate server for establishing P2P websocket connections

import { ipcRenderer } from 'electron';

const DEV_MODE = true;

export default { 
  state: {
    msgOwner: '', // 'host or peer'
    socket: null,
    wsURL: 'ws://localhost:3000', // DEV_MODE ? 'ws://localhost:3000' : `wss://${window.location.origin}:3000`,
  },
  getters: { 
    WS_SERVER_URL(state) {
      return state.wsURL;
    },
    WS_SOCKET(state) {
      return state.socket;
    },
  },
  mutations: { 
    WS_SERVER_URL_SET(state, value) {
      state.wsURL = value;
    },
    WS_SOCKET_SET(state, value) {
      state.socket = value;
    },
  },
  actions: { 
    WS_FETCH_PLAYER({ getters }) {
      // return axios
      //   .get(`${getters.WS_SERVER_URL}/player/`)
      //   .catch((error) => console.error(error));
    },
    WS_HOST_MATCH({ getters, commit }) {
      ipcRenderer.send('connection:host');

      commit('WS_SOCKET_SET', new WebSocket(getters.WS_SERVER_URL));

      getters.WS_SOCKET.addEventListener('open', () => {
        console.log("Successfully connected to the Pazaak websocket server...")
        // getters.WS_SOCKET.send('Hello Server! Host client is connected!')
      });

      getters.WS_SOCKET.addEventListener('close', () => {
        console.log('Websocket connection closed.');
      });

      getters.WS_SOCKET.addEventListener('error', (error) => {
        console.error('Websocket connection has closed due to an error.');
        console.error('Error:', error);
      });

      // Listen for data message
      getters.WS_SOCKET.addEventListener('message', (event) => {
        console.log('Recvd new data: ', event)
        //console.log('Recvd new data: ', JSON.parse(event.data), typeof JSON.parse(event.data));
        //this.plantData = Object.assign({}, JSON.parse(event.data));
      });
    },
    WS_CLOSE_MATCH() {
      ipcRenderer.send('connection:close');
    },
    // WS_JOIN_MATCH({ getters, dispatch }) {
    //   return axios
    //   .post(`${getters.WS_SERVER_URL}/host/`, config)
    //   .catch((error) => console.error(error));
    // },
  },
};