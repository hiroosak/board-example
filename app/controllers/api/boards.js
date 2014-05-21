'use strict';

//var Board = require('../../models/board.js');

exports.index = function(req, res) {
  //Board.find({}, null, {sort: 'asc', orderNum: 1}, function(err, boards) {
  Board.findWithUser().exec(function(err, boards) {
    res.send(boards, 200);
  });
};

exports.show = function(req, res) {
  if (!req.params.id) {
    throw new Error('error is thrown!');
  }
  Board.findByIdJoinThread(req.params.id, function(err, board) {
    if (!req.params.id) {
      throw new Error('Not Found!');
    }
    res.send(board, 200);
  });
};
