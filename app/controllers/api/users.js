'use strict';

var User = require('../../models/user');

exports.me = function(req, res) {
  if (req.user) {
    res.send({
      _id: req.user._id,
      profile: req.user.profile,
      created: req.user.created,
      updated: req.user.updated
    } , 200);
  } else {
    res.send({
      'errors': {
        'message': 'But Authentication data'
      },
    }, 400);
  }
};
