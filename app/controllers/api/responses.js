'use strict';

//var Response = require('../../models/response.js');

exports.index = function(req, res) {
  Response.find()
          .populate('user', 'profile')
          .populate('board')
          .exec(function(err, responses) {
    res.send(responses, 200);
  });
};

exports.show = function(req, res) {
  if (!req.params.id) {
    throw new Error('error is thrown!');
  }
  Response.findById(req.params.id).populate('user', 'profile').exec(function(err, response) {
    if (err) {
      throw new Error('Error Occured!!');
    }
    res.send(response, 200);
  });
};

/**
 * Create Response
 */
exports.create = function(req, res) {
  var params = req.body;
  params.user = req.user._id;

  Response.saveFromThread(params, function(err, data) {
    if (err) {
      res.send(err, 400);
    }
    res.send({
      _id:     data._id,
      content: data.content,
      created: data.created,
      updated: data.updated
    }, 200);
  });
};

/**
 * @destroy
 */
exports.destroy = function(req, res) {
  if (!req.params.id) {
    throw new Error('error is thrown!');
  }

  Response.find({_id: req.params.id, user: req.user._id})
    .remove()
    .exec(function(err, data) {
      if (err) {
        return res.send({'message': 'Error!'}, 400);
      }
      if (data === 0) {
        return res.send({'message': 'NotFound'}, 404);
      }
      res.send({status: 'ok'}, 200);
    });
};

