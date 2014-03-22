(function () {
  'use strict';

  var should = require('should')
    , Board = require('../../app/models/board')
    , User = require('../../app/models/user')
    , setup = require('../setup')
    , fixture = require('../fixture');

  setup();

  describe('Board', function() {
    it('should findWithUser', function(done) {
      Board.findWithUser().exec(function(err, boards) {
        boards.should.be.ok;
        boards.should.have.length(3);
        done();
      });
    });
  });

  describe("findJoinThread", function() {
    var board_id;
    beforeEach(function(done) {
      Board.findOne({name: 'Board1'}).exec(function(err, board) {
        if (err) {
          throw new Error;
        }
        board_id = board._id;
        done();
      });
    });

    it('should get findByIdJoinThread', function(done) {
      Board.findByIdJoinThread(board_id, function(err, res) {
        res.board.should.ok
        res.threads.should.ok
        done();
      });
    });
  });

  //describe('Thread', function() {
  //  it('should get findByBoardName', function(done) {
  //    Thread.findByBoardName('Board1', function(err, res) {
  //      res.board.should.ok
  //      res.board.should.have.property('name', 'Board1');
  //      res.threads.should.ok
  //      done();
  //    });
  //  });
  //});
})();
