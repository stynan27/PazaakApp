const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// below for a .env config file
// const path = require('path'); 
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}

const app = express();
const port = process.env.PORT;

// use statements (similar to include), need later?
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

// … Configure Express, and register necessary API route handlers

// todo: separation between production and dev server
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(__dirname + '/../build'));

//     app.get('*', (request, response) => {
//         response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
//     });
// } 

// app.use('/', playerRouter);
// app.use('/', opponentRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));