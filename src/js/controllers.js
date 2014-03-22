"use strict";

/**
 * Module boardApp.controllers
 *
 * @api public
 */
angular.module('boardApp.controllers', []).
  controller('HomeCtrl', ['$scope', 'helpers',
    function($scope, helpers, growl) {
      $scope.isLogin = helpers.isLogin();
    }
  ]).
  controller('BoardShowCtrl', ['$scope', '$routeParams', 'Board', 'helpers',
    function($scope, $routeParams, Board, helpers) {
      var board = Board.get({boardId: $routeParams.boardId}, function(data) {
        $scope.board   = data.board;
        $scope.threads = data.threads;
        $scope.isLogin = helpers.isLogin();
      });

    }
  ]).
  controller('ThreadCreateCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
    }
  ]).
  controller('ResponseCreateCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
    }
  ]).
  controller('ThreadShowCtrl', ['$rootScope', '$location', '$scope', '$http', '$routeParams', 'growl', 'helpers', 'Thread', 'Response',
    function($rootScope, $location, $scope, $http, $routeParams, growl, helpers, Thread, Response) {
      $scope.isLogin = helpers.isLogin();
      var data = Thread.get({threadId: $routeParams.threadId}, function(data) {
        $scope.thread    = data.thread;
        $scope.responses = data.responses;
      });

      $scope.destroyThread = function(thread) {
        Thread.destroy({threadId: thread._id}, {}, function(data) {
          growl.addSuccessMessage('スレッドを削除しました', {ttl: 3000});
          $location.path('/boards/' + thread.board._id).replace();
        }, function(err) {
          growl.addErrorMessage('スレッド削除に失敗しました', {ttl: 3000});
        });
      };

      $scope.destroyResponse = function(response) {
        Response.destroy({responseId: response._id}, {}, function(data) {
          $scope.responses = _.reject($scope.responses, function(_response) {
            return _response._id === response._id
          });
          growl.addSuccessMessage('コメントを削除しました', {ttl: 3000});
        }, function(err) {
          growl.addErrorMessage('コメント削除に失敗しました', {ttl: 3000});
        });
      };

      $scope.user = $rootScope.user;
      $scope.$on('profileResolved', function(event, data) {
        $scope.user = data;
      });
    }
  ]);

/**
 * components
 */
angular.module('boardApp.partials', ['ngRoute', 'angular-growl']).
  controller('HeaderNavRightCtrl', ['$rootScope', '$scope', '$window', 'Authenticate', 'localStorageService', 'helpers',  '$resource',
    function($rootScope, $scope, $window,  Authenticate, localStorageService, helpers, $resource) {
      Authenticate.post(function(data) {
        localStorageService.add('tkn', data.token);
        $scope.isLogin = true;

        // TODO: token保存前に $resource を定義してしまって, headers の値が入力できない
        var User = $resource('/api/1/users/:userId', {'userId': '@id'}, {
          me: {method: 'GET', params:{userId: 'me'}, headers: helpers.authHeader()}
        });

        User.me(function(data) {
          $scope.profile = data.profile;
          $rootScope.user = data;
          $rootScope.$broadcast('profileResolved', data);
        });
      }, function(data) {
        $scope.isLogin = false; // error
        localStorageService.add('tkn', null);
      });
    }
  ]).
  controller('SideMenuCtrl', ['$scope', 'Category',
    function($scope, Category) {
      Category.query(function(data, status) {
        $scope.categories = data;
      });
    }
  ]).
  controller('CreateThreadFormCtrl', ['$scope', '$routeParams', '$http', '$location', 'growl', 'Board', 'Thread',
    function($scope, $routeParams, $http, $location, growl, Board, Thread) {
      Board.get({boardId: $routeParams.boardId}, function(data) {
        $scope.board = data.board;
      });
      $scope.submit = function(thread) {
        thread.board = $routeParams.boardId;
        Thread.save(thread, function(data) {
          growl.addSuccessMessage('スレッドを投稿しました', {ttl: 3000});
          $location.path('/boards/' + thread.board).replace();
        }, function(data) { // error
          growl.addErrorMessage('スレッド投稿失敗しました', {ttl: 3000});
        });
      };
    }
  ]).
  controller('CreateResponseFormCtrl', ['$scope', '$routeParams', '$http', '$location', 'growl', 'Thread', 'Response',
    function($scope, $routeParams, $http, $location, growl, Thread, Response) {
      Thread.get({threadId: $routeParams.threadId}, function(data) {
        $scope.thread = data.thread;
      });
      $scope.submit = function(response) {
        response.thread = $routeParams.threadId;
        Response.save(response, function(data) {
          growl.addSuccessMessage('コメントを投稿しました', {ttl: 3000});
          $location.path('/threads/' + response.thread).replace();
        }, function(data) { // error
          growl.addErrorMessage('コメント投稿失敗しました', {ttl: 3000});
        });
      };
    }
  ]);
