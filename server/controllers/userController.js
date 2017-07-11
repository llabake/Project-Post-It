const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken"); 
const secret = "drtguug8*werty+uifghyu"


// const routes = function () {
// //   const userRouter = express.Router();
const User = require('../models').User;

  module.exports = {
    signUp  (req, res)  {
      if(!req.body.username ){
        res.json({message:"username is required"}).status(400);
      }
      else if (!req.body.firstname ){
        res.json({message: "firstname is required"}).status(400);
      }
      else if (!req.body.lastname ){
        res.json({message:"lastname is required"}).status(400);
      }
      else if (!req.body.email ){
        res.json({message:"email is required"}).status(400);
      }
      else if (!req.body.password ){
        res.json({message:"password is required"}).status(400);
      }
      else if (!req.body.confirmpassword ){
        res.json({message:"confirmpassword is required"}).status(400);
      }
      else if (req.body.password != req.body.confirmpassword){
        res.json({message:"Please ensure the Password match"}).status(400);
      }
      else
      {
        User.findOne({
          where: {
            username: req.body.username,
            email: req.body.email 
          },
        })
        .then((user, err) => {
          if (user) {
            res.status(409).send('User already exists')
          } else if (err){
            res.status(400)
          } else {
            User.create({
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, salt),
              firstName: req.body.firstname,
              lastName: req.body.lastname
           })
           .then(user => res.status(201).send("Your account has been created"))
           .catch(error => res.status(400).send(error));
          }
              
        })
      }
    },
  findUser ( req, res) {
    User.findOne({
      where: {
        username: req.body.username    
      },
    })
    .then((user, err) => {
      if(err)
      {
        res.status(500).send(err)
      }
      else if (!user){
        res.json(
          {
            success: false, 
            message: 'Authentication failed. Incorrect credentials.'
          }
        ).status(400);
      }
      else  if (user){
        if (bcrypt.compareSync(req.body.password , user.password)){
          
          const token = jwt.sign({data: user}, "secret", {expiresIn: 8640});

          res.json({
            message: 'user logged in', 
            token: token
          }).status(200);

        }
        else {
          res.status(400)
          .json(
            {
              message: 'Incorrect credentials, please check username or password'
            }
            );
        }
      }
      
    })
  }
}
  



