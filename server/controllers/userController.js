const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


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
    },
  findUser ( req, res) {
    User.findOne({
      where: {
        username: req.body.username    
      },
    })
    .then((err, user) => {
      if(err)
      {
        res.status(500).send(err)
      }
      else if (!user){
        res.json({message: 'Incorrect credentials, please check username or password'}).status(400);
      }
      else  if (user){
        if (bcrypt.compareSync(req.body.password , user.password)){
          res.json({message: 'user logged in', token: 'token'}),status(200);

        }
        else {
          res.json({message: 'Incorrect credentials, please check username or password'}).status(400);
        }
      }
      
    })
  }
}
  



