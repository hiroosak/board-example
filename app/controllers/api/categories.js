'use strict';

var Category = require('../../models/category.js');

exports.index = function(req, res) {
  Category.tree().exec(function(err, categories) {
    res.send(categories, 200);
  });
};
