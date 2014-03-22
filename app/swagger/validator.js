'use strict';

var url = require('url');

module.exports = function(req, path, httpMethod) {
  // Validator を入れるとダメになる
  //  example, only allow POST for api_key='special-key'
  //if ('POST' === httpMethod || 'DELETE' === httpMethod || 'PUT' === httpMethod) {
  //  var apiKey = req.headers.api_key;
  //  if (!apiKey) {
  //    apiKey = url.parse(req.url,true).query.api_key;
  //  }
  //  if ('special-key' === apiKey) {
  //    return true;
  //  }
  //  return false;
  //}
  return true;
};
