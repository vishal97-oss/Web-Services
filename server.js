const express = require('express');
const app = express();
const mongodb1 = require('./DB/connect');
const port = 8080;
  // const port = process.env.PORT || 8080
  const { auth } = require('express-openid-connect');
  require('dotenv').config();

const bodyParser = require('body-parser');
// app.use(cors());
app
  .use(bodyParser.json());

  
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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



// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



// app.listen(port,() => {
//   console.log(`listening on port ${port}`)
// })