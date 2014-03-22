(function () {
  'use strict';

  var should = require('should')
    , Response = require('../../app/models/response')
    , setup   = require('../setup')
    , fixture = require('../fixture');

  setup();

  describe("Response", function() {

    describe("Create", function() {
      var params = {};

      beforeEach(function() {
        params = {
          user: fixture.data.user._id,
          thread: fixture.data.thread._id,
          content: "Content TEST BBB"
        };
      });

      it("can create response", function(done) {
        Response.saveFromThread(params, function(err, res) {
          should(err).not.be.ok;
          res.should.be.ok;
          res.should.have.property('content', params.content);
          done();
        });
      });

      it("invalid params", function(done) {
        params.user = 'NotFoundUserId';
        Response.saveFromThread(params, function(err, res) {
          err.should.be.ok;
          err.should.have.property({'path': 'user'});
          done();
        });
      });

      it("invalid content param", function(done) {
        for(var i=0, content = ''; i<101; i++) { content += '0123456789'; }
        params.content = content;

        Response.saveFromThread(params, function(err, res) {
          err.errors.should.have.property('content');
          done();
        });
      });
    });
  });
})();
