module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        //User.hasOne(models.Profile);
        User.hasMany(models.Token);
      }
    }
  });
  return User;
};
