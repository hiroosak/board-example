'use strict';

var Thread = require('../../models/thread.js')
  , _      = require('lodash');

exports.index = function(req, res) {
  var params = {};
  if (req.params.boardId) {
    params.board = req.params.boardId; 
  }
  Thread.find(params).populate('board').exec(function(err, boards) {
    res.send(boards, 200);
  });
};

exports.show = function(req, res) {
  if (!req.params.id) {
    throw new Error('error is thrown!');
  }
  Thread.findByIdJoinResponses(req.params.id, function(err, board) {
    if (!req.params.id) {
      throw new Error('Not Found!');
    }
    res.send(board, 200);
  });
};

/**
 * Create thread
 */
exports.create = function(req, res) {
  var params = req.body;
  params.user = req.user._id;

  var thread = new Thread(params);
  thread.save(function(err, data) {
    if (err) {
      res.send(err, 400);
    }
    res.send({
      _id: data._id,
      name: data.name,
      content: data.content,
      created: data.created,
      updated: data.updated
    }, 200);
  });
};

exports.destroy = function(req, res) {
  if (!req.params.id) {
    throw new Error('error is thrown!');
  }

  Thread.find({_id: req.params.id, user: req.user._id})
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

/**
 * Create thread
 */
exports.create = function(req, res) {
  var params = req.body;
  params.user = req.user._id;

  var thread = new Thread(params);
  thread.save(function(err, data) {
    if (err) {
      return res.send(err, 400);
    }
    if (_.isEmpty(data)) {
      return res.send({message: "Internal Server Error"}, 400);
    }
    res.send({
      _id: data._id,
      name: data.name,
      content: data.content,
      created: data.created,
      updated: data.updated
    }, 200);
  });
};
