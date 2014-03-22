'use strict';

var swagger   = require('swagger-node-express')
  , express   = require('express')
  , _         = require('underscore')
  , settings  = require('../config/settings')
  , models    = require('../app/swagger/models')
  , resources = require('../app/swagger/resources')
  , validator = require('../app/swagger/validator');

module.exports = function(app) {

  swagger.setAppHandler(app);      // setup app handler

  swagger.addValidator(validator);
  swagger.addModels(models);

  if (resources.getResources) {
    _.each(resources.getResources, function(resource) {
      swagger.addGet(resource);
    });
  }

  if (resources.postResources) {
    _.each(resources.postResources, function(resource) {
      swagger.addPost(resource);
    });
  }

  swagger.configure(settings.host + '/api/1', '0.1');

  // Serve up swagger ui at /docs via static route
  var docs_handler = express.static(__dirname + '/../public/swagger-ui');
  app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
      res.writeHead(302, { 'Location' : req.url + '/' });
      res.end();
      return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return docs_handler(req, res, next);
  });
};
