module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('users', ['id', 'deletedAt']);
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.removeIndex('users', ['id', 'deletedAt']);
    done()
  }
}
