'use strict';

var mongoose = require('mongoose')
  , async    = require('async')
  , _        = require('async')
  , Board    = require('./board')
  , User     = require('./user')
  , Response = require('./response');

var threadSchema = new mongoose.Schema({
  id: Number,
  board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
  user:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

/**
 * validation
 */
threadSchema.path('name').validate(function(v) {
  return v.length <= 40;
}, 'over max length');

threadSchema.path('content').validate(function(v) {
  return v.length <= 1000;
}, 'over max length');

/**
 * static methods
 */

threadSchema.statics.findByIdJoinResponses = function(id, callback) {
  this.findById(id)
      .populate('user', 'profile')
      .populate('board')
      .exec(function(err, thread) {
    if (err) {
      callback(err, thread);
    }
    Response.find({thread: thread})
            .sort({updated: 'desc'})
            .populate('user', 'profile')
            .limit(1000)
            .exec(function (err, responses) {
      callback(err, {
        thread: thread,
        responses: responses ? responses : []
      });
    });
  });
};

module.exports = mongoose.model('Thread', threadSchema);
