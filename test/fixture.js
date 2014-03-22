'use strict';

var Category = require('../app/models/category')
  , Board    = require('../app/models/board')
  , User     = require('../app/models/user')
  , Thread   = require('../app/models/thread')
  , Response = require('../app/models/response')
  , _     = require('lodash')
  , async = require('async');

var data = {};

data.user = {
  _id: '5305407a5ca770708b89d82d',
  twitter: 1,
  tokens: [
    {kind: 'twitter', accessToken: 'accessToken', tokenSecret: 'tokenSecret'}
  ],
  profile: {name: 'TestUser'}
};

data.boards = [
  {
    _id: '500000000000000000000000',
    name: 'Board1',
    user: data.user._id
  },
  {
    _id: '500000000000000000000001',
    name: 'Board2',
    user: data.user._id
  },
  {
    _id: '500000000000000000000002',
    name: 'Board3',
    user: data.user._id
  }
];

data.board = data.boards[0];

data.categories = [
  {
    _id: '510000000000000000000000',
    name: 'Category1',
    boards: _.pluck(data.boards.slice(0, 2), '_id')
  },
  {
    _id: '510000000000000000000001',
    name: 'Category2',
    boards: _.pluck(data.boards.slice(2, 1), '_id')
  }
];

data.category = data.categories[0];
  
data.thread = {
  _id: "5305407a5ca770708b89dd80",
  board: data.board._id,
  user: data.user._id,
  name: 'Test Thread Title',
  content: 'Test Thread Content'
};

data.response = {
  _id: "5305407a5ca770708b87dd80",
  thread: data.thread._id,
  user: data.user._id,
  content: 'Test Response'
};

module.exports = {
  data: data,
  exec: function (done) {

    /* create board */
    var createBoard = function(board){
      return function(user, callback){
        var _board = new Board(board);
        _board.save(function (err, res) {
          if (err) { console.log('Board Error'); throw err;  }
          callback(err, res);
        });
      };
    };

    /* create category */
    var createCategory = function(category){
      return function(user, callback){
        var _category = new Category(category);
        _category.save(function (err, res) {
          if (err) { console.log('Category Error'); throw err;  }
          callback(err, res);
        });
      };
    };

    async.waterfall([
      function (callback) { /* create user */
        var user = new User(data.user);
        user.save(function (err, res) {
          if (err) { console.log('User Error'); throw err;  }
          callback(err, res);
        });
      },
      createBoard(data.boards[0]),
      createBoard(data.boards[1]),
      createBoard(data.boards[2]),
      createCategory(data.categories[0]),
      createCategory(data.categories[1]),
      function (board, callback) { /* create thread */
        var thread = new Thread(data.thread);
        thread.save(function(err, res) {
          callback(err, res);
        });
      },
      function (thread, callback) { /* create response */
        var response = new Response(data.response);
        response.save(function (err, res) {
          callback(null, res);
        });
      }
    ],
    function (err, result) {
      done();
    });
  }
};
