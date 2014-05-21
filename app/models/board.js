module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define('Board', {
    name: DataTypes.STRING,
    orderNum: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'boards',
    classMethods: {
      associate: function(models) {
        Board.belongsTo(models.Category);
        Board.hasMany(models.Thread);
      }
    }
  });

  return Board;
};
