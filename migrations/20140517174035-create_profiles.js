module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('profiles', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
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
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('profiles')
    done()
  }
}
