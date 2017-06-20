'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models)=> {
        // associations can be defined here
        Group.hasMany(models.Message);
      }
    }
  });
  return Group;
};