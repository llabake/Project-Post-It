const express = require('express');

// const routes = function () {
// //   const userRouter = express.Router();
const Group = require('../models').Group;




  module.exports = {
    createGroup  (req, res)  {
      if(!req.body.name ){
        res.json({message:"name is required"}).status(400);
      }
      else
      {
          
        Group.create({
          name: req.body.name,
        })
        .then(group => res.status(201).send("Your group has been created"))
        .catch(error => res.status(400).send(error));
      }
    },
//   findUser ( req, res) {
//     User.findOne({
//       where: {
//         username: req.body.username,
//         password: req.body.password      },
//     })
//     .then((err, user) => {
//       if(err)
//       {
//         res.status(500).send(err)
//       }
//       else if (!user){
//         res.json({message: 'Please check username or password'}).json(400)
//       }
//       else {
//         res.json({message: 'user looged in', user: user})
//       }
      
//     })
//   }
}
  
