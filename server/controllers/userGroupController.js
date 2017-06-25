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
            Group.findOne ({
                where: { 
                    id: req.params.group_id      
                },
            }).then((group, err) => {
                if (err) {
                    return res.json({message: err}).status(400);
                } else if (!group) {
                    return res.json({message: "Group does not exist"}).status(404);
                }  else if (group) {
                    if ((req.user.id) != (group.userId)){
                        return res.json({message: "Group exists, permission to add user denied for non group admin"}).status(403);
                    } else {
                        // Group admin is current user
                        User.findOne ({
                            where: {
                                username: req.body.username
                            },
                        }).then((user, err) => {
                            if (err) {
                                return res.json({message: err}).status(400)
                            } else if (user) {
                                userGroup.findOne({
                                    where: {
                                        groupId: req.params.group_id,
                                        userId: user.id
                                    }
                                })
                                .then((usergroup, err) => {
                                    if (usergroup) {
                                         res.json({message: "user already in this group"}).status(409)
                                    } else {
                                        userGroup.create({
                                            groupId: req.params.group_id,
                                            userId: user.id
                                        })
                                        .then ((usergroup, err) => {
                                            if (err) {
                                                res.status(400).json({msg: error})
                                            } else if (usergroup) {
                                                res.json({message: "user added successfully", usergroup}).status(201)
                                            }
                                        })
                                        // .catch(error => res.status(400).json({msg: error}))
                                    }
                                })
                         
                            } else {
                                return res.json({message: "User not found"}).status(404)
                            }
                        })
                    }  
                } 
            })
        }
    },

    
    removeUserFromGroup (req, res) {
        if (!req.body.username) {
            res.json({message:"username is required"}).status(400);
        } else {
            userGroup.findOne ({
                where: { 
                    userId: user.id
                },
            })
            .then((user, err) => {
                if (err) {
                    return res.json({message: "error sending your request"}).status(400);
                } else if (!user) {
                    return res.json({message: "user does not exist in group"}).status(404);
                } else  {
                    if ((req.user.id) != (group.userId) || (req.user.id) != (group.groupid)) {
                        return res.json({message: "user exists in group, permission to delete user denied for non group admin or user"}).status(403);
                    } else {
                        userGroup.destroy({
                            where: {
                                username: req.params.username
                            },
                        })
                        .then ((user) => {
                            res.json({message:"user deleted from group"}).status(204)
                        })
                        .catch(error => {
                            res.json({message:" user not found "}).status(412)
                        })
                            // res.json({message: "user exists, proceed to remove user"}).status(200);
                    }
                } 
              
            })                
        }
    }
}
  

