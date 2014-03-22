"use strict";

if ('production' === process.env.NODE_ENV) {
  var settings = {
    host: 'http://localhost' 
  };
} else {
  var settings = {
    host: 'http://localhost' 
  };
}

module.exports = settings;
