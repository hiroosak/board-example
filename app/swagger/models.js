'use strict';

module.exports = {
  'Status': {
    'id': 'Status',
    'properties': {
      'status': {
        'type': 'string',
        'format': 'string'
      }
    }
  },
  'Profile': {
    'id': 'Profile',
    'required': ['name'],
    'properties': {
      'name': {
        'type': 'string',
        'format': 'string'
      },
      'website': {
        'type': 'string',
        'format': 'string'
      },
      'picture': {
        'type': 'string',
        'format': 'string'
      }
    }
  },
  'Token': {
    'id': 'Token',
    'required': ['token'],
    'properties': {
      'token': {
        'type': 'string',
        'description': 'json web token'
      }
    }
  },
  'User': {
    'id': 'User',
    'required': ['created', 'updated'],
    'properties': {
      '_id': {
        'type': 'string',
        'description': 'user_id'
      },
      'profile': {
        '$ref': 'Profile'
      }
    }
  },
  'Category': {
    'id': 'Category',
    'required': ['created', 'updated'],
    'properties': {
      'name': {
        'type': 'string',
        'description': 'カテゴリの名前'
      },
      'orderNum': {
        'type': 'int',
        'description': '順番'
      },
      'created': {
        'type': 'date-time',
        'description': '作成日時'
      },
      'updated': {
        'type': 'date-time',
        'description': '更新日時'
      },
      'boards': {
        'type': 'array',
        'items': {
          '$ref': 'Board'
        }
      }
    }
  },
  'Board': {
    'id': 'Board',
    'required': ['created', 'updated'],
    'properties': {
      'name': {
        'type': 'string',
        'description': '掲示板の名前'
      },
      'groupName': {
        'type': 'string',
        'description': 'グループ名'
      },
      'orderNum': {
        'type': 'int',
        'description': '順番'
      },
      'created': {
        'type': 'date-time',
        'description': '作成日時'
      },
      'updated': {
        'type': 'date-time',
        'description': '更新日時'
      },
      'threads': {
        'type': 'array',
        'items': {
          '$ref': 'Thread'
        }
      },
      'threadsCount': {
        'type': 'int',
        'description': 'スレッド数'
      }
    }
  },
  'Thread': {
    'id': 'Thread',
    'required': ['id', 'board_id', 'created', 'updated'],
    'properties': {
      'id': {
        'type': 'string',
        'description': 'スレid'
      },
      'board': {
        '$ref': '掲示板',
        'description': '掲示板'
      },
      'name': {
        'type': 'string',
        'description': 'スレの名前'
      },
      'content': {
        'type': 'string',
        'description': 'スレの内容'
      },
      'user_id': {
        'type': 'string',
        'description': '作成ユーザー'
      },
      'created': {
        'type': 'date-time',
        'description': '作成日時'
      },
      'updated': {
        'type': 'date-time',
        'description': '更新日時'
      },
      'responses': {
        'type': 'array',
        'items': {
          '$ref': 'Response'
        }
      },
      'responsesCount': {
        'type': 'int',
        'description': 'レス数'
      }
    }
  },
  'Response': {
    'id': 'Response',
    'required': ['id', 'thread_id', 'created', 'updated'],
    'properties': {
      'id': {
        'type': 'string',
        'description': 'レスid'
      },
      'thread_id': {
        'type': 'string',
        'description': '親スレのid'
      },
      'content': {
        'type': 'string',
        'description': 'レスの内容'
      },
      'user_id': {
        'type': 'string',
        'description': '作成ユーザー'
      },
      'created': {
        'type': 'date-time',
        'description': '作成日時'
      },
      'updated': {
        'type': 'date-time',
        'description': '更新日時'
      }
    }
  }
};
