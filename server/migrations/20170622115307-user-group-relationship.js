'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addConstraint('userGroups', ['userId'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      name: 'usergroup_user_association'
      // onDelete: 'cascade',
      // onUpdate: 'cascade'
    });
    queryInterface.addConstraint('userGroups', ['groupId'], {
      type: 'FOREIGN KEY',
      references: { //Required field
        table: 'Groups',
        field: 'id'
      },
      name: 'usergroup_group_association'
      // onDelete: 'cascade',
      // onUpdate: 'cascade'
    });
    queryInterface.addConstraint('userGroups', ['groupId',"userId"], {
      type: 'unique',
      name: 'usergroup_groupid_userid_unique'
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeConstraint('userGroups', 'usergroup_user_association');
    queryInterface.removeConstraint('userGroups', 'usergroup_group_association');
    queryInterface.removeConstraint('userGroups', 'usergroup_groupid_userid_unique');

  }
};
