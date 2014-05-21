'use strict';

var db = require('../../models');

exports.index = function(req, res) {
  db.Category.findAll({include: [db.Board]}).success(function(categories) {
    console.log('categories', categories);
    res.send(categories, 200);
  });
};
