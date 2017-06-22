'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
      'userGroups',
      'username',
      Sequelize.STRING
      );
    queryInterface.addConstraint('userGroups', ['username'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'Users',
        field: 'username'
      },
      name: 'usergroup_association'
      // onDelete: 'cascade',
      // onUpdate: 'cascade'
    });
    queryInterface.addConstraint('userGroups', ['username',"userid"], {
      type: 'unique',
      name: 'usergroup_username_userid_unique'
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeConstraint('userGroups', 'usergroup_association');
    queryInterface.removeConstraint('userGroups', 'usergroup_username_userid_unique');
  }
};
