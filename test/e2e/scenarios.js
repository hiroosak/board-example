'use strict';

describe('boardApp', function() {

  describe('HomeCtrl', function() {

    beforeEach(function() {
      browser().navigateTo('/');
    });

    it('should get', function() {
      expect(browser().location().url()).toBe('/');
    });

    it('should render board specific links', function() {
      element('a.board-item').click();
      expect(browser().location().url()).toMatch('/boards/[a-f0-9]+');
    });
  });

  describe('Board detail view', function() {
    beforeEach(function() {
      browser().navigateTo('/');
      element('a.board-item').click();
    });

    it('should display', function(){
      //expect(browser().location().url()).toBe('/');
    });
  });

  // TODO
  describe('Create Thread Tesging', function() {
    beforeEach(function() {
      browser().navigateTo('/');
    });
  });
});
