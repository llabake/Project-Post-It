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
              groupId: req.params.groupId,
              userId: req.user,
              text: req.body.text
            })
            .then((message) => {
                res.json({message:"message sent successfully", messagebody : "message.text" }).status(200)
            })
        }
    },
    retrieveMessageFromGroup (req,res) {
        if (req.params.groupId) {
            Group.findAll({
                where: {
                    messageId: req.params.messageId
                },
            })
            .then((messages, err) => {
                if (message) {
                    res.json({message:message}).status(200)
                }else if (err){
                    res.json({message:" No message for this group "}).status(404)
                }
            })
        }
    },
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
    deleteMessageFromGroup (req,res) {
        if (req.params.messageId) {
            Group.destroy({
                where: {
                    messageId: req.params.messageId
                },
            })
            .then((result, err) => {
                if (result) {
                    res.json({message:"user deleted from group"}).status(204)
                }else if (err){
                    res.json({message:" user not found "}).status(412)
                }
            })
        }
    }

}

