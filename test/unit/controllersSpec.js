'use strict';

describe('boardApp.controllers', function(){

  /* 純粋にobject比較するためのMatcherを作成 */
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('boardApp'));
  beforeEach(module('boardApp.services'));

  describe('HomeCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new;
      ctrl = $controller('HomeCtrl', {$scope: scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('BoardShowCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      var boardId = '00000001';

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/1/boards/' + boardId)
        .respond({board: {name: 'Board1'}, threads: [{name: 'Thread1'}, {name: 'Thread2'}]});

      $routeParams.boardId = boardId;

      scope = $rootScope.$new;
      ctrl = $controller('BoardShowCtrl', {$scope: scope});
    }));

    it('should get BoardList', function(){
      expect(scope.board).toEqual(null);
      $httpBackend.flush();
      expect(scope.board).toEqual({name: 'Board1'});
      expect(scope.threads).toEqualData([{name: 'Thread1'}, {name: 'Thread2'}]);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('ThreadShowCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      var boardId = '00000001';

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/1/boards/' + boardId)
        .respond({board: {name: 'Board1'}, threads: [{name: 'Thread1'}, {name: 'Thread2'}]});

      $routeParams.boardId = boardId;

      scope = $rootScope.$new;
      ctrl = $controller('BoardShowCtrl', {$scope: scope});
    }));

    it('should get BoardList', function(){
      expect(scope.board).toEqual(null);
      $httpBackend.flush();
      expect(scope.board).toEqual({name: 'Board1'});
      expect(scope.threads).toEqualData([{name: 'Thread1'}, {name: 'Thread2'}]);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});

describe('boardApp.partials', function(){
  var scope, ctrl, $httpBackend;

  beforeEach(module('boardApp.partials'));
  beforeEach(module('boardApp.services'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('HeaderNavRightCtrl', function(){

    describe('success pattern', function(){
      beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        $httpBackend.expectPOST('/api/1/authenticate').respond(200, {
          'token': 'XXXXXXXXXXX'
        });
        $httpBackend.expectGET('/api/1/users/me').respond(200, {
          '_id': 'XXXXX',
          'profile': {
            'name': 'name',
            'picture': 'http://example.jp/picture.png'
          }
        });
        ctrl = $controller('HeaderNavRightCtrl', {$rootScope: $rootScope, $scope: scope});
      }));

      it('should be true isLogin', inject(function() {
        $httpBackend.flush();
        expect(scope.isLogin).toEqual(true);
      }));

    });

    describe('error pattern', function(){
      beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectPOST('/api/1/authenticate').respond(401, {
          'errors': {
            'message': 'But Authentication data'
          }
        });
        scope = $rootScope.$new();
        ctrl = $controller('HeaderNavRightCtrl', {$rootScope: $rootScope, $scope: scope});
      }));

      it('should be false isLogin', inject(function() {
        $httpBackend.flush();
        expect(scope.isLogin).toEqual(false);
      }));
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('SideMenuCtrl', function(){
    var scope, ctrl, $httpBackend;

    /* 純粋にobject比較するためのMatcherを作成 */
    beforeEach(function(){
      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    var categoryList = [
      {'_id': '1', 'name': 'Category A', 'boards': []},
      {'_id': '2', 'name': 'Category B', 'boards': []},
      {'_id': '3', 'name': 'Category C', 'boards': []}
    ];

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      $httpBackend.expectGET('/api/1/categories').respond(200, categoryList);
      ctrl = $controller('SideMenuCtrl', {$scope: scope});
    }));

    it('should eql Board list', inject(function() {
      $httpBackend.flush();
      expect(scope.categories).toEqualData(categoryList);
    }));
  });

  /**
   * スレッド投稿フォーム
   */
  describe('CreateThreadFormCtrl', function(){
    var scope, ctrl, $httpBackend;
    var boardId = 'boardId';

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $routeParams.boardId = boardId;
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('/api/1/boards/' + boardId).respond(200, {
        'board': {
          '_id': 'boardId',
          'name': 'boardTitle'
        }
      });

      scope = $rootScope.$new();
      ctrl = $controller('CreateThreadFormCtrl', {$scope: scope});
    }));

    it('assigns board', inject(function() {
      $httpBackend.flush();
      expect(scope.board).toEqualData({'_id': 'boardId', 'name': 'boardTitle'});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
