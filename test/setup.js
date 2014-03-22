'use strict';
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose')
  , fixture = require('./fixture')
  , flag = false;

module.exports = function() {
  if (flag) { return; }
  flag = true;
  var connection = mongoose.connection;

  connection.on('open', function() {
    console.log('open connection');
  });

  connection.on('close', function() {
    console.log('close connection');
  });

  before(function(done) {
    mongoose.connect('mongodb://localhost:27017/board_test', null, function(err, res) {
      connection.db.dropDatabase(function(err, res) {
        fixture.exec(done);
      });
    });
  });

  after(function(done) {
    console.log('done');
    connection.db.dropDatabase(function(err, res) {
      mongoose.disconnect(done);                         
    });
  });
};
