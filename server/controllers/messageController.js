import express from 'express';

// const routes = function () {
// //   const userRouter = express.Router();S
import { User, Group, userGroup, Message } from '../models';

module.exports = {
    sendMessageToGroup  (req, res)  {S
        if(!req.body.text) {
            res.status(400).json({message:"message text is required"});
            } else {
            Group.findOne({
                where: {
                    id: req.params.group_id
                },
            })
            .then ((group, err) => {
                if (err) {
                    return res.status(400).json({message: err});
                } else if (!group) {
                    return res.status(404).json({message: "Group does not exist"});
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
                            res.status(400).json({message: "user is not a member of the group and cant send message to group"})
                        } else {
                            res.status(400).json({message: "error sending message to group"})
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
                return res.status(400).json({message: err});
            } else if (!group) {
                return res.status(404).json({message: "Group does not exist"});
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
                            groupId: req.params.group_id                           
                        })
                        .then((messages) => {
                            res.json({ 
                                messages: messages
                                // messagebody : messages.text, 
                                // messageSentAt: messages.createdAt
                            }).status(200)
                        })
                        .catch((error) =>{
                            res.status(400).send(error)
                        });
                    } else if (!usergroup) {
                        res.status(400).json({message: "user is not a member of the group and cant read message from group"})
                    } else {
                        res.status(400).json({message: "error retrieving message from group"})
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
                return res.status(400).json({message: err});
            } else if (!group) {
                return res.status(404).json({message: "Group does not exist"});
            } else {
                userGroup.findOne({
                    where: {
                        groupId: req.params.group_id,
                        userId: req.user.id
                    },
                })
                .then((usergroup, err) =>{
                    if (usergroup) {
                        Message.findOne({
                            where: {
                                id: req.body.messageId
                            },
                        })
                        .then((message, err) => {
                            if (err) {
                                return res.status(400).json({message: err});
                            } else if (!message) {
                                return res.status(404).json({message: "message not found"});
                            } else {
                                if ((req.user.id) == (usergroup.userId) || (req.user.id) == (group.userId)) {
                                    Message.destroy({
                                        where: {
                                            id: req.body.messageId,
                                            groupId: req.params.group_id 
                                        },
                                    })
                                    .then((message, err) => {
                                        if (err) {
                                            res.status(400).json({message:"error sending your request"})
                                        }else {
                                            res.status(204).json({message:"message deleted from group"})
                                        }
                                    })
                                } else { 
                                    res.status(400).json({message: "user is not the admin or the creator of the message"})
                                }
                                
                            }
                        })

                    } else if (!usergroup) {
                        res.status(400).json({message: "user is not a member of the group"})
                    } else {
                        res.status(400).json({message: "error deleting message from group"})
                    }
                    
                })
            }
        })
    }
}
