const express = require('express');

// const routes = function () {
// //   const userRouter = express.Router();
const Group = require('../models').Group;
const User = require('../models/').User;
const userGroup = require('../models/').userGroup;


module.exports = {
    addUserToGroup  (req, res)  {
      if(!req.body.username) {
        res.json({message:"username is required"}).status(400);
      }
      else {
        User.findOne ({
          where: {
            username: req.body.username    
          },
        }).then((user, err) => {
          if (err) {
            return res.json({message: err}).status(404)

          } else (user)  => {
              userGroup.create({
                  groupId: req.body.groupId,
                  userId: req.body.userId,
                  username: req.body.username
              })
              .then ((usergroup) => {
                  res.json({message:"user added successfully"}).status(200)
                })   
            }
        });

    },

    removeUserFromGroup (req,res) {
        if (req.params.username) {
            Group.destroy({
                where: {
                    username: req.params.username
                },
            })
            .then((user, err) => {
                if (user) {
                    res.json({message:"user deleted from group"}).status(204)
                }else if (err){
                    res.json({message:" user not found "}).status(412)
                }
            })
        }
    }
  }

