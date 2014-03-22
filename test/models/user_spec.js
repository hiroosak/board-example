(function () {
  'use strict';

  var should = require('should');

  var mongoose = require('mongoose');
  var User = require('../../app/models/user')
    , setup = require('../setup');

  setup();

  describe('User', function() {

    describe('findOne', function () {
      it('should find twitter user', function(done) {
        var user = new User();
        User.findOne({twitter: 1}, function(err, res) {
          if (err) {
            done(err);
          }
          should(res).ok;
          should(res.profile).have.property('name', 'TestUser');
          done();
        });
      });
    });
  });

})();
