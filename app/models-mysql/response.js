'use strict';

var mongoose = require('mongoose')
  , Board    = require('./board')
  , User     = require('./user')
  , Thread   = require('./thread');

var responseSchema = new mongoose.Schema({
  id: Number,
  thread: {type: mongoose.Schema.Types.ObjectId, ref: 'Thread'},
  user:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: {type: String},
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

/**
 *  Validation
 */

responseSchema.path('content').validate(function(v) {
  return v.length <= 1000;
}, 'over max length');

/**
 * static
 */
responseSchema.statics.saveFromThread = function(data, callback) {
  var Thread = require('./thread');
  var that = this;

  Thread.findById(data.thread).exec(function(err, thread) {
    if (err) {
      res.send({}, 400);
    }
    var response = new that({
      board: thread.board,
      thread: thread._id,
      user: data.user,
      content: data.content
    });
    response.save(callback);
  });
};

module.exports = mongoose.model('Response', responseSchema);
