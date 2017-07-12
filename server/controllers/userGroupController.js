import express from 'express';

// const routes = function () {
// //   const userRouter = express.Router();
import { User, Group, userGroup } from '../models';


module.exports = {
    addUserToGroup  (req, res)  {
        if(!req.body.username) {
            res.status(400).json({message:"username is required"});
        }
        else {
            Group.findOne ({
                where: { 
                    id: req.params.group_id      
                },
            }).then((group, err) => {
                if (err) {
                    return res.status(400).json({message: err});
                } else if (!group) {
                    return res.status(404).json({message: "Group does not exist"});
                }  else if (group) {
                    if ((req.user.id) != (group.userId)){
                        return res.status(403).json({message: "Group exists, permission to add user denied for non group admin"});
                    } else {
                        // Group admin is current user
                        User.findOne ({
                            where: {
                                username: req.body.username
                            },
                        }).then((user, err) => {
                            if (err) {
                                return res.status(400).json({message: err})
                            } else if (user) {
                                userGroup.findOne({
                                    where: {
                                        groupId: req.params.group_id,
                                        userId: user.id
                                    },
                                })
                                .then((usergroup, err) => {
                                    if (usergroup) {
                                         res.status(409).json({message: "user already in this group"})
                                    } else {
                                        userGroup.create({
                                            groupId: req.params.group_id,
                                            userId: user.id
                                        })
                                        .then ((usergroup, err) => {
                                            if (err) {
                                                res.status(400).json({msg: error})
                                            } else if (usergroup) {
                                                res.status(201).json({message: "user added successfully", usergroup})
                                            }
                                        })
                                        // .catch(error => res.status(400).json({msg: error}))
                                    }
                                })
                         
                            } else {
                                return res.status(404).json({message: "User not found"})
                            }
                        })
                    }  
                } 
            })
        }
    },

    
    removeUserFromGroup (req, res) {
        if (!req.body.username) {
            res.status(400).json({message:"username is required"});
        } else {
            User.findOne ({
                where: { 
                    username: req.body.username
                },
            })
            .then((user, err) => {
                if (err) {
                    return res.status(400).json({message: "error sending your request"});
                } else if (!user) {
                    return res.status(404).json({message: "user not found"});
                } else {
                    Group.findOne({
                        where: {
                            id: req.params.group_id
                        },
                    })
                    .then((group ,err) => {
                        if (err) {
                            return res.status(400).json({ message: " error handling your request" });
                        } else if(!group) { 
                            return res.json({ message: "group not found"});
                        } else {
                            userGroup.findOne ({
                                where: { 
                                    userId: user.id,
                                    groupId: req.params.group_id
                                },
                            })
                            .then((usergroup, err) => {
                                if (err) {
                                    return res.status(400).json({message: "error sending your request"});
                                } else  if (!usergroup) {
                                    return res.status(404).json({message: "user does not exist in the group"});
                                } else {
                                    if ((req.user.id) == (usergroup.userId) || (req.user.id) == (group.userId)) {
                                        userGroup.destroy({
                                            where: {
                                                userId: user.id,
                                                groupId: req.params.group_id
                                            },
                                        })
                                        .then ((usergroup, err) => {
                                            if (err){
                                                res.status(400).json({message:  `an error occured error: ${error}`})
                                            } else {
                                                res.status(204).json({message: "user deleted from group"})
                                            }  
                                        })
                                    } 
                                    else {
                                        return res.status(403).json({message: "user exists in group, permission to delete user denied for non group admin or user"});
                                    } 
                                }
                            })
                        }
                    })
                }
            })
        }
    }
}
  

