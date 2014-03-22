'use strict';

/**
 *
 */

var mongoose = require('mongoose')
  , async = require('async')
  , _ = require('lodash')
  , secrets = require('../config/secrets')
  , User = require('../app/models/user')
  , Category = require('../app/models/category')
  , Board = require('../app/models/board')
  , Thread = require('../app/models/thread')
  , Response = require('../app/models/response');

var connection = mongoose.connection;

connection.on('error', function() {
  console.log('✗ MongoDB Connection Error. Please make sure MongoDB is running.'.red);
});


var _user;

var _category_hash = {};

/* create board */
var createBoard = function(board){
  return function(user, callback){
    if (arguments.length === 1) {
      var callback = user;
    }
    var _board = new Board(board);
    _board.save(function (err, res) {
      if (err) { console.log('Board Error'); throw err;  }
      console.log('afterCreateBoard: ' + res.name);
      _category_hash[res.name] = res._id;
      callback(err, res);
    });
  };
};

/* create category */
var createCategory = function(category){
  return function(user, callback){
    if (arguments.length === 1) {
      var callback = user;
    }
    var _category = new Category(category);
    _category.save(function (err, res) {
      if (err) { console.log('Category Error', err); throw err;  }
      console.log('afterCreateCategory: ' + res.name);
      callback(err, res);
    });
  };
};

var _threadCount = 1;
var _thread_arr = [];
var createThread = function() {
  console.log('create threadAction ' + _threadCount);

  var thread = {
    board: _.chain(_category_hash).values().shuffle().first().value(),
    user: _user,
    name: 'テストスレッド:' + _threadCount,
    content: _threadCount + ' テストスレッドの内容。'
  };
  _threadCount += 1;

  return function(res, callback){
    if (arguments.length === 1) {
      var callback = res;
    }
    console.log('before thread save');
    var _thread = new Thread(thread);
    _thread.save(function (err, res) {
      if (err) { console.log('Thread Error', err); throw err;  }
      console.log('afterCreateThread: ' + res.name);
      _thread_arr.push(res);
      callback(err, res);
    });
  };
};

var _responseCount = 1;
var createResponse = function(user) {
  console.log('create responseAction ' + _responseCount);

  var response = {
    thread: _.chain(_thread_arr).slice(0, 400).shuffle().first().value(),
    user: _user,
    content: _responseCount + ' テストコメントの内容。'
  };
  _responseCount += 1;

  return function(res, callback){
    if (arguments.length === 1) {
      var callback = res;
    }
    console.log('before response save');
    var _response = new Response(response);
    _response.save(function (err, res) {
      if (err) { console.log('Thread Error', err); throw err;  }
      console.log('afterCreateResponse: ' + res.content);
      callback(err, res);
    });
  };
};

var userAction = function(callback) {
  console.log('start userAction');
  var user = new User();
  user._id = '5312dd89700ba331347cb945'
  user.twitter = 1;
  user.tokens.push({kind: 'twitter', accessToken: 'accessToken', tokenSecret: 'tokenSecret'});
  user.profile.name = 'AdminUser';
  user.isAdmin = true;
  user.save(function(err, u) {
    console.log('saved user');
    _user = u;
    callback(null, u);
  });
};

var categoryTree = [
  {'練習用': ['練習用掲示板']},
  {'カテゴリ1': ['掲示板1', '掲示板2', '掲示板3']},
  {'カテゴリ2': ['掲示板1', '掲示板2', '掲示板3', '掲示板4']},
  {'カテゴリ3': ['掲示板1', '掲示板2', '掲示板3', '掲示板4']},
  {'カテゴリ4': ['掲示板1', '掲示板2', '掲示板3', '掲示板4']}
];

mongoose.connect(secrets.db, null, function(err, res) {
  connection.db.dropDatabase(function(err, res) {

    var funcCall = [userAction];
    var boardNames = _.chain(categoryTree).map(function(h){ return _.chain(h).values().value() }).flatten().value();

    var num = 1;
    _.each(boardNames, function(name) {
      funcCall.push(createBoard({name: name, orderNum: num}));
      num += 1;
    });

    async.parallel(funcCall, function(err, result) {
      var funcCall = [];

      var num = 1;
      _.forEach(categoryTree, function(cData) {
        var name = _.chain(cData).keys().first().value();
        var boardIds = _.chain(cData).values().first().map(function(d) {
          return _category_hash[d];
        }).value();
        funcCall.push(createCategory({name: name, orderNum: num, boards: boardIds}));
        num += 1;
      });

      for(var i=0; i<50; i++) {
        funcCall.push(createThread());
      }

      async.parallel(funcCall, function(err, result) {
        console.log('finished creating threads');
        var funcCall = [];
        for(var i=0; i<500; i++) {
          funcCall.push(createResponse());
        }
        async.parallel(funcCall, function(err, result) {
          console.log('all done');
          mongoose.disconnect();
        });
      });
    });
  });
});
