'use strict';
module.exports = (sequelize, DataTypes)=>{
  const User = sequelize.define('User', {
    username: { 
        type:DataTypes.STRING,
        unique:true
    },
    email: { 
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Message, {foreignKey: "userId"});
        User.hasMany(models.Group, {foreignKey: "userId"});
        
      }
    }
  });
  return User;
};