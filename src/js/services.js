"use strict";

/**
 * boardHelper
 */
var helpers = angular.module('boardApp.helpers', ['LocalStorageModule'])

/**
 * lodash
 */
helpers.factory('_', function() {
  if (window._) {
    return window._; // assumes underscore has already been loaded on the page
  } else {
    return null;
  }
});

helpers.factory('helpers', ['_', 'localStorageService',
  function(_, localStorageService) {
    return {
      authHeader: function() {
        return {"authorization": "Bearer " + localStorageService.get('tkn')}
      },
      isLogin: function() {
        return !(_.isNull(localStorageService.get('tkn')));
      }
    };
  }]);

/**
 * resource
 */
var services = angular.module('boardApp.services', ['ngResource', 'boardApp.helpers']).
  factory('Authenticate', ['$resource',
    function($resource){
      return $resource('/api/1/authenticate', {}, {
        post:   {method: 'POST'},
        verify: {method: 'POST', url: '/api/1/authenticate/verify'}
      });
    }
  ]).
  factory('User', ['$resource', 'helpers',
    function($resource, helpers){
      return $resource('/api/1/users/:userId', {'userId': '@id'}, {
        me: {method: 'GET', params:{userId: 'me'}, headers: helpers.authHeader()}
      });
    }
  ]).
  factory('Category', ['$resource',
    function($resource){
      return $resource('/api/1/categories');
    }
  ]).
  factory('Board', ['$resource',
    function($resource){
      return $resource('/api/1/boards/:boardId', {'boardId': '@id'});
    }
  ]).
  factory('Thread', ['$resource', 'helpers',
    function($resource, helpers){
      return $resource('/api/1/threads/:threadId/:action', {'threadId': '@_id'}, {
        save: {method: 'POST', headers: helpers.authHeader()},
        destroy: {method: 'POST', headers: helpers.authHeader(), params: {'action': 'destroy'}}
      });
    }
  ]).
  factory('Response', ['$resource', 'helpers',
    function($resource, helpers){
      return $resource('/api/1/responses/:responseId/:action', {'responseId': '@id'}, {
        save: {method: 'POST', headers: helpers.authHeader()},
        destroy: {method: 'POST', headers: helpers.authHeader(), params: {'action': 'destroy'}}
      });
    }
  ]);

