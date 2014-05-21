module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    userId: DataTypes.INTEGER,
    kind: DataTypes.STRING,
    token: DataTypes.STRING,
    secretToken: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'tokens',
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User);
      }
    }
  });
  return Token;
};
