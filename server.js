const express = require('express');
const app = express();
const mongodb1 = require('./DB/connect');

const port = 8080;


const bodyParser = require('body-parser');
// app.use(cors());
app
  .use(bodyParser.json());

  app.use('/', require('./Routes'));

  mongodb1.initDb((err, mongodb1) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(process.env.PORT || port);
      console.log(`Connected to DB and listening on ${port}`);
    }
    //const port2 = 8080;
  });