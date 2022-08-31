const WebSocketServer = require('ws');

//const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
// below for a .env config file
const path = require('path'); 
// const dotenv = require('dotenv').config();

// if (dotenv.error) {
//   throw dotenv.error;
// }

//const app = express();
const wsPort = process.env.PORT || 3000; // process.env.PORT;

// models
// const hostRouter = require('./routes/host-router');

// use statements (similar to include), need later?
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors());
// app.use(bodyParser.json());

// app url/uri rules (API) 
// app.use('/', hostRouter);
// app.use('/', playerRouter);
// app.use('/', opponentRouter);

let counter = 0;

// process send example to show communication
// setInterval(() => {
//   process.send({ counter: counter++ });
// }, 1000);

const ws = new WebSocketServer.Server({
  port: wsPort,
});

// Check for ws message types
ws.on("connection", (socket) => {
  console.log(`WebSocket connection established on port ${wsPort}`);
  // send a message to the client
  // socket.send(JSON.stringify({
  //   type: "hello from server",
  //   content: [ 1, "2" ]
  // }));

  // // receive a message from the client
  // socket.on("message", (data) => {
  //   const packet = JSON.parse(data);

  //   switch (packet.type) {
  //     case "hello from client":
  //       // ...
  //       break;
  //   }
  // });
  socket.on("close", () => {
    console.log("A client has disconnected");
  });
  
  // handling client connection error
  socket.on("error", () => {
    console.error("Websocket Connection Error Occurred")
  });

  socket.on("message", (msg) => {
    console.log('Msg recvd:', msg);
  });
});