if (process.env.NODE_ENV) {
  var node_env = process.env.NODE_ENV;
} else {
  var node_env = 'development';
}
  
var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , dbConf    = require('../../config/database.json')[node_env]
  , sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password)
  , db        = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
