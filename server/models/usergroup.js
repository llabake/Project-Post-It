'use strict';
module.exports = function(sequelize, DataTypes) {
  var userGroup = sequelize.define('userGroup', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userGroup;
};