module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tokens', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      kind: {
        type: 'VARCHAR(12)',
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secretToken: {
        type: DataTypes.STRING,
        allowNull: true
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
    migration.dropTable('tokens')
    done()
  }
}
