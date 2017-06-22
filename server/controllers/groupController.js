const express = require('express');

// const routes = function () {
// //   const userRouter = express.Router();
const Group = require('../models').Group;
const User = require('../models/').User



  module.exports = {
    createGroup  (req, res)  {
      if(!req.body.name ){
        res.json({message:"name is required"}).status(400);
      }
      else {
        Group.findOne ({
          where: {
            name: req.body.name    
          },
        }).then((group, err) => {
          if (err) {
            return res.json({message: err}).status(400);

          } else if (group){
            return res.json({message: "Group already exists"}).status(400);

          } else {
            Group.create({
              name: req.body.name,
              username: req.body.username,
              userId: req.body.userId
            })
        .then(group => res.json({message:"Your group has been created", groupname:group.name,groupid:group.groupId}).status(201)
        )}
      });
    }
  }
}
  

