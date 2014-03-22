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
  {'ニュース速報': ['国内', '海外', 'ニュース', '政治', 'スポーツ', 'コンピュータ', '地域']},
  {'実況': ['野球実況', 'サッカー実況', 'テレビ実況']},
  {'雑談・暇つぶし': ['独り言', 'クイズ', 'しりとり']},
  {'恋愛': ['結婚', '不倫', '離婚', '失恋']},
  {'エンタメ': ['タレント女性', 'タレント男性', 'お笑い芸人', 'AKB48', 'ドラマ']},
  {'マンガ・アニメ': ['マンガ', 'アニメ', '小説']},
  {'ゲーム': ['家庭用ゲーム', 'PCゲーム', 'スマホゲーム', 'ソーシャルゲーム', 'ゲーム業界']},
  {'音楽': ['邦楽', '洋楽', '音楽全般']},
  {'スポーツ': ['野球', 'サッカー', 'スキー・スノボ', '球技', 'その他のスポーツ']},
  {'旅行・外出': ['国内旅行', '海外旅行', '登山', 'ツーリング']},
  {'株式': ['株式総合']},
  {'学問': ['文系', '理系', '英会話', '小学校', '中学校', '高校', '大学']}
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

      for(var i=0; i<500; i++) {
        funcCall.push(createThread());
      }

      async.parallel(funcCall, function(err, result) {
        console.log('finished creating threads');
        var funcCall = [];
        for(var i=0; i<5000; i++) {
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
