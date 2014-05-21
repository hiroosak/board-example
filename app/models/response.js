module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    threadId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    orderNum: DataTypes.INTEGER,
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'responses',
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Thread);
      }
    }
  });
  return Response;
};
