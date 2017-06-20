'use strict';
module.exports = (sequelize, DataTypes)=> {
  const userGroup = sequelize.define('userGroup', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Group.hasMany(models.User);
      }
    }
  });
  return userGroup;
};