(function () {
  "use strict";

  var should = require('should')
    , routes = require('../../routes/routes')
    , req, res;

  beforeEach(function() {
    req = {};
    res = {
      redirect: function(){},
      render: function(){}
    }
  });

  describe('Routes', function() {
    it('is routing home', function(done) {
      done();
    });
  });

})();

