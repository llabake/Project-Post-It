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

            Group.create({
              name: req.body.name,
              userId: req.user.id
            }).then((group, err) => {
              if (err) {
                return res.json({message: err}).status(400)
              }else{
                return res.json({group: group}).status(200)
              }
            });
          }
        });
      }
    }
}
  

