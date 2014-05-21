'use strict';

var mongoose = require('mongoose')
  , Thread = require('./thread');

var boardSchema = new mongoose.Schema({
  name: String,
  orderNum: {type: Number, default: 0},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

boardSchema.static('findWithUser', function() {
  return this.find().sort('orderNum').populate('user', 'profile');
});

boardSchema.static('findByIdJoinThread', function(id, callback) {
  this.findById(id).exec(function(err, board) {
    if (err) {
      callback(err, null);
    } else {
      Thread.find({board: board})
            .sort({updated: 'desc'})
            .populate('user', 'profile')
            .limit(1000)
            .exec(function (err, threads) {
        callback(err, {
          board: board,
          threads: threads ? threads : []
        });
      });
    }
  });
});

module.exports = mongoose.model('Board', boardSchema);
