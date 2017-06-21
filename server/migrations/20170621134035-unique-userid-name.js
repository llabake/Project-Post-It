'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */ 
    queryInterface.addConstraint('Groups', ['userId','name'], {
      type: 'unique',
      name: 'group_userId_name_unique'
    });

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      queryInterface.removeConstraint('Groups', 'group_userId_name_unique');
      
      

  }
};
