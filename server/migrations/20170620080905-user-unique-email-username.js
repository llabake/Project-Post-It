'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'user_email_unique'
    });
    queryInterface.addConstraint('Users',  ['username'], {
      type: 'unique',
      name: 'user_username_unique'
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  queryInterface.removeConstraint('Users', 'user_email_unique');
  queryInterface.removeConstraint('Users', 'user_username_unique');
  }
};
