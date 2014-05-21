module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orderNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    });
    done();
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('categories');
    done();
  }
}
