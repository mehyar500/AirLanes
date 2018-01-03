const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
const routes = require("./routes"); //require our routes for use
const app = express();

app.set('port', (process.env.PORT || 3000));

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "502e29ead6874bee9d4869b08a336317",
  captureUncaught: true,
  captureUnhandledRejections: true
});
// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

// ===== Middleware ====
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// Add routes, both API and view
app.use(routes);

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '../build/'))});
}

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler());

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
