const express = require('express');

// const routes = function () {
// //   const userRouter = express.Router();
const Group = require('../models').Group;
const User = require('../models/').User




  module.exports = {
    createGroup  (req, res)  {
      if(!req.body.name ){
        res.json({message:"name is required"}).status(400);
      }
      else {
        User.findOne ({
          where: {
            id: req.user.id    
          },
        }).then((user, err) => {
          if (err) {
            return res.json({message: err}).status(400)

          } else {
            // user.createGroup({
            //   name: req.body.name
            // }).then((group, err) => {
            //   if (err) {
            //     return res.json({message: err}).status(400)
            //   }
            //   return res.json({group: group}).status(200)
            // })
            return res.json({user : user});
          }
        })
               
        // res.json({message: 'Group route', userId: req.user.id}).status(200);
        // Group.create({
        //   name: req.body.name,
        // })
        // .then(group => res.status(201).send("Your group has been created"))
        // .catch(error => res.status(400).send(error));
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
  

// const group = require('../models').group;

// module.exports = {
//     create(req, res) {
//     if(!req.body.group_name ){
//         res.json({message:"group name is required"})
//       }
//       else if (!req.body.admin ){
//         res.json({message:"administrator name is required"})
//       }
//       else if (!req.body.members){
//         res.json({message:"group members is required"})
//       }
//       else
//       {
//     return group
//       .create({
//         group_name: req.body.group_name,
//         admin: req.body.admin,
//         members: req.body.members,
        
//      })
      
//      .then(group => res.status(200).send(group))
//       .catch(error => res.status(400).send(error));
// }
//   },
// };