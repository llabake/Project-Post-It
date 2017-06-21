'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    *///Foreign Key
    queryInterface.addConstraint('Groups', ['userId'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      name: 'group_user_association'
      // onDelete: 'cascade',
      // onUpdate: 'cascade'
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      queryInterface.removeConstraint('Groups', 'group_user_association');

  }
};
