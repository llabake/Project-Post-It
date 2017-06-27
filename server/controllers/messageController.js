const express = require('express');

// const routes = function () {
// //   const userRouter = express.Router();
const Group = require('../models/').Group;
const User = require('../models/').User;
const Message = require('../models/').Message;
const userGroup = require('../models/').userGroup;


module.exports = {
    sendMessageToGroup  (req, res)  {
        if(!req.body.text) {
            res.json({message:"message text is required"}).status(400);
            } else {
            Group.findOne({
                where: {
                    id: req.params.group_id
                },
            })
            .then ((group, err) => {
                if (err) {
                    return res.json({message: err}).status(400);
                } else if (!group) {
                    return res.json({message: "Group does not exist"}).status(404);
                } else if (group) {
                    userGroup.findOne({
                        where: {
                            groupId: req.params.group_id,
                            userId: req.user.id
                        },
                    })
                    .then((usergroup, err) =>{
                        if (usergroup) {
                            Message.create({
                                groupId: req.params.group_id,
                                userId: req.user.id,
                                text: req.body.text
                            })
                            .then((message) => {
                                res.json({
                                    message:"message sent successfully", 
                                    messagebody : message.text, 
                                    id : message.id,
                                    messageSentAt: message.createdAt
                                }).status(200)
                            })
                            .catch((error) =>{
                                res.status(400).send(error)
                            });
                        } else if (!usergroup) {
                            res.json({message: "user is not a member of the group and cant send message to group"}).status(400)
                        } else {
                            res.json({message: "error sending message to group"}).status(400)
                        }
                    })
                }
            });
        }
    },
    retrieveMessageFromGroup (req, res) {
        Group.findOne({
            where: {
                id: req.params.group_id
            },
        })
        .then ((group, err) => {
            if (err) {
                return res.json({message: err}).status(400);
            } else if (!group) {
                return res.json({message: "Group does not exist"}).status(404);
            } else if (group) {
                userGroup.findOne({
                    where: {
                        groupId: req.params.group_id,
                        userId: req.user.id
                    },
                })
                .then((usergroup, err) =>{
                    if (usergroup) {
                        Message.findAll({
                            groupId: req.params.group_id,
                            messageId: req.params.message_id
                        })
                        .then((message) => {
                            res.json({ 
                                messagebody : message.text, 
                                messageSentAt: message.createdAt
                            }).status(200)
                        })
                        .catch((error) =>{
                            res.status(400).send(error)
                        });
                    } else if (!usergroup) {
                        res.json({message: "user is not a member of the group and cant read message from group"}).status(400)
                    } else {
                        res.json({message: "error retrieving message from group"}).status(400)
                    }
                })
            }
        });

    },

    
    deleteMessageFromGroup (req, res) {
        Group.findOne({
            where: {
                id: req.params.group_id
            },
        })
        .then ((group, err) => {
            if (err) {
                return res.json({message: err}).status(400);
            } else if (!group) {
                return res.json({message: "Group does not exist"}).status(404);
            } else if (group) {
                userGroup.findOne({
                    where: {
                        groupId: req.params.group_id,
                        userId: req.user.id
                    },
                })
                .then((usergroup, err) =>{
                    if (usergroup) {
                            if ((req.user.id) == (usergroup.userId) || (req.user.id) == (group.userId)) {
                            Message.destroy({
                                where: {
                                    messageId: message.id,
                                    groupId: req.params.group_id 
                                },
                            })
                            .then((message, err) => {
                                if (message) {
                                    res.json({message:"message deleted from group"}).status(204)
                                }else if (err){
                                    res.json({message:" message not found "}).status(412)
                                }
                            })
                            .catch(error => {
                                res.status(400).send(error)
                            });
                    
                        } else if (!usergroup) {
                            res.json({message: "user is not a member of the group and cant send message to group"}).status(400)
                        } else {
                            res.json({message: "error deleting message to group"}).status(400)
                        }
                    }
                })
            }
        })
    }
}
