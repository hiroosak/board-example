var boardApp = angular.module('boardApp', [
  'ngRoute',
  'ngCookies',
  'LocalStorageModule',
  'ui.bootstrap',
  'angular-growl',
  'ngAnimate',
  'boardApp.helpers',
  'boardApp.services',
  'boardApp.controllers',
  'boardApp.partials'
]);

boardApp.config(['$routeProvider',
  function($routeProvider) {
    var rootParams = {
      'templateUrl': '/partials/home.html',
      'controller': 'HomeCtrl'
    };

    $routeProvider.
      when('/', rootParams).
      when('', rootParams).
      when('/boards/:boardId', {
        'templateUrl': '/partials/board.html',
        'controller': 'BoardShowCtrl'
      }).
      when('/threads/:threadId', {
        'templateUrl': '/partials/thread.html',
        'controller': 'ThreadShowCtrl'
      }).
      when('/boards/:boardId/threads/create', {
        'templateUrl': '/partials/thread_create.html',
        'controller': 'ThreadCreateCtrl'
      }).
      when('/threads/:threadId/responses/create', {
        'templateUrl': '/partials/response_create.html',
        'controller': 'ResponseCreateCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
