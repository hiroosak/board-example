'use strict';

var mongoose = require('mongoose')
  , Board = require('./board');

var categorySchema = new mongoose.Schema({
  name: String,
  orderNum: {type: Number, default: 0},
  boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
  created: {type: Date, default: Date.now },
  updated: {type: Date, default: Date.now }
});

categorySchema.static('tree', function() {
  return this.find().sort('orderNum').populate('boards');
});

module.exports = mongoose.model('Category', categorySchema);
