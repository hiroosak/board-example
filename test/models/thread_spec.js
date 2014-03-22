(function () {
  'use strict';

  var should = require('should')
    , Board = require('../../app/models/board')
    , User = require('../../app/models/user')
    , Thread = require('../../app/models/thread')
    , setup   = require('../setup')
    , fixture = require('../fixture');

  setup();

  describe("Thread", function() {
    it("should response findByIdJoinResponses", function(done) {
      Thread.findByIdJoinResponses(fixture.data.thread._id, function(err, res) {
        if (err) { throw new Error; }
        res.thread.should.be.ok;
        res.responses.should.be.ok;
        res.responses[res.responses.length - 1].should.have.property('content', fixture.data.response.content);
        done();
      });
    });

    describe("Create Thread", function() {
      var params = {};

      beforeEach(function() {
        params = {
          user: fixture.data.user._id,
          board: fixture.data.board._id,
          name: "TEST AAA",
          content: "TEST BBB"
        };
      });

      it("can create thread", function(done) {
        var thread = new Thread(params);
        thread.save(function(err, res) {
          should(err).not.be.ok;
          res.should.be.ok;
          res.should.have.property('name', params.name);
          done();
        });
      });

      it("invalid params", function(done) {
        params.user = 'NotFoundUserId';
        var thread = new Thread(params);
        thread.save(function(err, res) {
          err.should.be.ok;
          err.should.have.property({'path': 'user'});
          done();
        });
      });

      it("invalid name param", function(done) {
        params.name = "01234567890123456789012345678901234567890"; // over length
        var thread = new Thread(params);
        thread.save(function(err, res) {
          err.should.be.ok;
          err.errors.should.have.property('name');
          done();
        });
      });

      it("invalid content param", function(done) {
        for(var i=0, content = ''; i<101; i++) { content += '0123456789'; }
        params.content = content;

        var thread = new Thread(params);
        thread.save(function(err, res) {
          err.errors.should.have.property('content');
          done();
        });
      });
    });
  });
})();
