'use strict';

/**
 * Module dependencies.
 */

var express = require('express')
  , MongoStore = require('connect-mongo')(express)
  , http = require('http')
  , url  = require('url')
  , path = require('path')
  , mongoose = require('mongoose')
  , swagger = require('swagger-node-express')
  , passport = require('passport');

var app = express();

/**
 * API keys + Passport configuration.
 */
var secrets = require('./config/secrets');

/**
 * Mongoose configuration.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('✗ MongoDB Connection Error. Please make sure MongoDB is running.'.red);
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

app.set('env', app.get('env'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());

app.use(express.cookieParser(secrets.cookie.salt));
app.use(express.session({
  secret: secrets.sessionSecret,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24hours
    httpOnly: true
  },
  store: new MongoStore({
    db: mongoose.connection.db,
    auto_reconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development or test only
if ('production' === app.get('env') || 'development' === app.get('env') || 'test' === app.get('env')) {
  app.use(express.errorHandler());
  // swagger
  require('./routes/swagger')(app);
}

require('./routes/routes')(app);

app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on port %d in %s mode', app.get('port'), app.settings.env);
});
