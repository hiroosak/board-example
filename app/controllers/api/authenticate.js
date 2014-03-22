'use strict';

var jwt     = require('jsonwebtoken')
  , _       = require('lodash')
  , secrets = require('../../../config/secrets');

exports.index = function(req, res) {
  if (!req.user) {
    res.send({
      'errors': {
        'message': 'But Authentication data'
      },
    },401);
    return;
  }
  var payload = _.pick(req.user, ['_id', 'profile']);
  payload.type = 'token'
  var token = jwt.sign(payload, secrets.jwt.secret, secrets.jwt.options);
  res.json({token: token});
};

exports.verify = function(req, res) {
  jwt.verify(req.body.token, secrets.jwt.secret, secrets.jwt.options, function(err, decode) {
    res.json({user: decode});
  });
};
