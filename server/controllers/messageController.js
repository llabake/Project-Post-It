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
      }
      else {
          Message.create({
              groupId: req.params.group_id,
              userId: user.id,
              text: req.body.text
            })
            .then((message) => {
                res.json({
                    message:"message sent successfully", 
                    messagebody : message.text, 
                    messageSentAt: message.createdAt}).status(200)
            })
            .catch(error => {
                res.status(400).send(error)
            });
        }
    },
    
    retrieveMessageFromGroup (req,res) {
        if (req.params.group_id) {
            Message.findAll({
                where: {
                    groupId: req.params.group_id
                    // messageId: req.params.message_id
                },
            })
            .then((message, err) => {
                if (message) {
                    res.json({message:message.text}).status(200)
                }else if (!message){
                    res.json({message:" No message for this group "}).status(404)
                } else {
                    res.json({message:" Error occured while retrieivng your messages "}).status(400)
                }
            })
            .catch(error => {
                res.status(400).send(error)
            });
        }
    },


    deleteMessageFromGroup (req,res)  {
        if (req.params.messageId) {
            Message.destroy({
                where: {
                    messageId: req.params.message_id,
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
        }
    }

}


    // updateMessageInGroup (req,res){
    //     if (req.params.messageId){
    //         Group.update({
    //             where:{
    //                 // groupId: req.params.groupId,
    //                 // userId: req.user,
    //                 text: req.body.text
    //             },
    //         })
    //         .then((message,err) => {
    //             if (message) {
    //                 res.json({message:"message.text"}).status(204)
    //             } else if (err){
    //                 res.json({message:" No message for this group "}).status(404)
    //             }
    //         ))

    //     }
    // },
