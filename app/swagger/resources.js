'use strict';

var swagger = require('swagger-node-express')
  , param   = require('../../node_modules/swagger-node-express/Common/node/paramTypes');

var authorizationParams = function() {
  return {
    'name': 'authorization',
    'description': 'Bearer [token]',
    'type': 'string',
    'required': true,
    'allowMultiple': false,
    'paramType': 'header',
    'defaultValue': 'Bearer [token]'
  };
};

exports.getResources = [
  {
    'spec': {
      'type' : 'User',
      'summary' : 'requires authentication',
      'path' : '/users/me',
      'notes' : '自分のユーザー取得',
      'method': 'GET',
      'produces': [
        'application/json'
      ],
      'parameters' : [
        authorizationParams()
      ],
      'responseMessages' : [
        {'code': 200, 'message': 'ok', 'responseModel': 'User' }
      ],
      'errorResponses' : [
        {'code': 401, 'reason': 'No Authorization header was found'}
      ],
      'nickname' : 'loginUser'
    },
  },
  {
    'spec': {
      'type' : 'Category',
      'summary' : '',
      'notes' : 'カテゴリ一覧取得',
      'path' : '/categories',
      'method': 'GET',
      'parameters' : [],
      'errorResponses' : [
      ],
      'produces': [
        'application/json'
      ],
      'nickname' : 'categories'
    }
  },
  {
    'spec': {
      'type' : 'Board',
      'summary' : '',
      'notes' : 'スレ一覧取得',
      'path' : '/boards',
      'method': 'GET',
      'parameters' : [],
      'responseMessage' : [swagger.errors.invalid('id'), swagger.errors.notFound('tag')],
      'errorResponses' : [swagger.errors.invalid('id'), swagger.errors.notFound('tag')],
      'produces': [
        'application/json'
      ],
      'nickname' : 'boards'
    }
  },
  {
    'spec': {
      'type' : 'Board',
      'summary' : '',
      'notes' : 'スレ一覧取得',
      'path' : '/boards/{boardId}',
      'method': 'GET',
      'parameters' : [swagger.pathParam('boardId', 'ID of board that needs to be fetched', 'string')],
      'responseMessage' : [swagger.errors.invalid('id'), swagger.errors.notFound('board')],
      'errorResponses' : [swagger.errors.invalid('id'), swagger.errors.notFound('board')],
      'nickname' : 'boards'
    }
  },
  {
    'spec': {
      'type' : 'Thread',
      'summary' : '',
      'notes' : 'スレッド一覧取得(全体)',
      'path' : '/threads',
      'method': 'GET',
      'parameters' : [swagger.queryParam('boardId', 'ID of board that needs to be fetched', 'string', false, null, '')],
      'threadMessage' : [swagger.errors.invalid('id'), swagger.errors.notFound('thread')],
      'errorThreads' : [swagger.errors.invalid('id'), swagger.errors.notFound('thread')],
      'nickname' : 'threads'
    }
  },
  {
    'spec': {
      'type' : 'Thread',
      'summary' : '',
      'notes' : 'スレッドとレス一覧取得',
      'path' : '/threads/{threadId}',
      'method': 'GET',
      'parameters' : [swagger.pathParam('threadId', 'ID of thread that needs to be fetched', 'string')],
      'threadMessage' : [swagger.errors.invalid('id'), swagger.errors.notFound('thread')],
      'errorThreads' : [swagger.errors.invalid('id'), swagger.errors.notFound('thread')],
      'nickname' : 'threads'
    }
  },
  {
    'spec': {
      'type' : 'Response',
      'summary' : '',
      'notes' : 'レス一覧取得',
      'path' : '/responses',
      'method': 'GET',
      //      'parameters' : [swagger.pathParam('tagId', 'ID of pet that needs to be fetched', 'string')],
      'parameters' : [],
      'responseMessage' : [swagger.errors.invalid('id'), swagger.errors.notFound('response')],
      'errorResponses' : [swagger.errors.invalid('id'), swagger.errors.notFound('response')],
      'nickname' : 'responses'
    }
  }
];

exports.postResources = [
  {
    'spec': {
      'type' : 'Thread',
      'summary' : 'requires authentication',
      'notes' : 'スレッドの作成',
      'path' : '/threads',
      'method': 'POST',
      'parameters' : [
        authorizationParams(),
        swagger.queryParam('name', 'スレッドの名前', 'string', true),
        swagger.queryParam('content', 'スレッドの本文', 'string', true),
        swagger.queryParam('board', '掲示板id', 'string', true),
      ],
      'responseMessages' : [swagger.errors.invalid('input')],
      'produces': [
        'application/json'
      ],
      'nickname' : 'createBoard'
    }
  },
  {
    'spec': {
      'type' : 'response',
      'summary' : 'requires authentication',
      'notes' : 'コメントの作成',
      'path' : '/responses',
      'method': 'POST',
      'parameters' : [
        authorizationParams(),
        swagger.queryParam('content', 'コメントの本文', 'string', true),
        swagger.queryParam('thread', 'スレッドid', 'string', true),
      ],
      'responseMessages' : [swagger.errors.invalid('input')],
      'produces': [
        'application/json'
      ],
      'nickname' : 'createBoard'
    }
  },
  {
    'spec': {
      'type' : 'Object',
      'summary' : '作成済',
      'description' : 'トークンの取得',
      'path' : '/authenticate',
      'notes' : '特に無し',
      'method': 'POST',
      'produces': [
        'application/json'
      ],
      'parameters' : [],
      'responseMessage' : [
        {'code': 200, 'message': 'ok', 'responseModel': 'Token' }
      ],
      'errorResponses' : [
        swagger.errors.invalid('Bad Authentication')
      ],
      'nickname' : 'authenticate'
    }
  },
  {
    'spec': {
      'type' : 'Object',
      'summary' : '作成済',
      'description' : 'トークンの紹介',
      'path' : '/authenticate/verify',
      'notes' : 'devのみ有効',
      'method': 'POST',
      'produces': [
        'application/json'
      ],
      'parameters' : [
        swagger.formParam('token', 'json web token', 'string')
      ],
      'responseMessage' : [
        {'code': 200, 'message': 'ok', 'responseModel': 'Token' }
      ],
      'errorResponses' : [
        swagger.errors.invalid('Bad Authentication')
      ],
      'nickname' : 'authenticate_verify'
    }
  }
];
