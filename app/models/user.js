'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  facebook: { type: String, unique: true, sparse: true },
  twitter:  { type: String, unique: true, sparse: true },
  isAdmin:  { type: Boolean, default: false },
  created:  { type: Date, default: Date.now },
  updated:  { type: Date, default: Date.now },
  tokens: Array,
  profile: {
    name: { type: String, default: '' },
    picture: { type: String, default: '' }
  }
});

module.exports = mongoose.model('User', userSchema);
