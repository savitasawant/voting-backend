const express = require('express');
const app = express();

// Loading dotenv to read .env and set environment variables when app starts
require('dotenv').config();

const mongoose = require('mongoose');
const router = express.Router();
const auth = require('./middlewares/auth');
const apiRouter = express.Router();
const cors = require('cors');
const routes = require('./routes')(router);
const apiRoutes = require('./routes/api')(apiRouter);
const bodyParser = require('body-parser');
const port = process.env.PORT;

// Enable all cors requests
app.use(cors());
// app.options('*', cors())


// parse application/json
app.use(bodyParser.json({ extended: true, limit: '25MB', }));

//  parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '5MB', parameterLimit: 100 }));

// routes which do not requires authentication
app.use(routes, cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'});
});

// connect to routes
// app.use('/api', auth.required, apiRoutes, cors());

app.use('/api', auth.required, apiRoutes, cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'});
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// handling unauthorized requests
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      if(err.message == 'jwt expired'){
          return res.status(401).send({ 'status': 'error', 'message': 'Your session has expired. Sign in again to continue working on awesome things.' });
      }
      return res.status(401).send({ 'status': 'error', 'message': 'Access token is invalid' });
  }
});

// routes not found
app.get('*', function (req, res) {
  res.status(404).send('Not found');
});

app.post('**', function (req, res) {
  res.status(404).send('Not found');
});

// connect to the mongodb 
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log(`Unable to connect to the database: ${err}`)
    } else {
        console.log(`Connected to the Database`);
    }
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection at: ${reason.stack || reason}`)
})

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

