module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    orderNum: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'categories',
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Board);
      }
    }
  });
  return Category;
};
