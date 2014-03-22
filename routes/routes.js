'use strict';

var passportConf      = require('../config/passport')
  , passport          = require('passport')
  , secrets           = require('../config/secrets')
  , settings          = require('../config/settings')
  , expressJwt        = require('express-jwt')
  , jwt               = require('jsonwebtoken')
  , _                 = require('lodash')
  , home              = require('../app/controllers/home')
  , api_authenticate  = require('../app/controllers/api/authenticate')
  , api_users         = require('../app/controllers/api/users')
  , api_categories    = require('../app/controllers/api/categories')
  , api_boards        = require('../app/controllers/api/boards')
  , api_threads       = require('../app/controllers/api/threads')
  , api_responses     = require('../app/controllers/api/responses');

module.exports = function(app){

  var expressJwtCallback = expressJwt({secret: secrets.jwt.secret});

  var refererCheckCallback = function(req, res, next) {
    if (req.headers.referer.search(settings.host) === 0 ) {
      next();
    } else {
      res.send("400 Bad Request", 400);
    }
  };

  var envCheckCallback = function(req, res, next) {
    if ('development' === app.get('env') || 'test' === app.get('env')) {
      next();
    } else {
      res.send("400 Bad Request", 400);
    }
  };

  app.get('/', home.index);

  app.post('/api/1/authenticate', refererCheckCallback, api_authenticate.index);
  app.post('/api/1/authenticate/verify', envCheckCallback, api_authenticate.verify);

  // boards
  app.get('/api/1/users/me',      expressJwtCallback, api_users.me);
  app.get('/api/1/categories',    api_categories.index);
  app.get('/api/1/boards',        api_boards.index);
  app.get('/api/1/boards/:id',    api_boards.show);
  app.get('/api/1/threads',       api_threads.index);
  app.get('/api/1/threads/:id',   api_threads.show);
  app.post('/api/1/threads',      expressJwtCallback, api_threads.create);
  app.post('/api/1/threads/:id/destroy', expressJwtCallback, api_threads.destroy);
  app.get('/api/1/responses',     api_responses.index);
  app.get('/api/1/responses/:id', api_responses.show);
  app.post('/api/1/responses/:id/destroy', expressJwtCallback, api_responses.destroy);
  app.post('/api/1/responses',     expressJwtCallback, api_responses.create);

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

  app.get('*', function(req, res) {
    res.send("404 Not Found", 404);
  });
};
