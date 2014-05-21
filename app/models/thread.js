module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define('Thread', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    orderNum: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'threads',
    classMethods: {
      associate: function(models) {
        Thread.belongsTo(models.Board);
        Thread.hasMany(models.Response);
      }
    }
  });
  return Thread;
};
