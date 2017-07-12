import express  from 'express';

// const routes = function () {
// //   const userRouter = express.Router();
import { User, Group } from '../models';




module.exports = {
  createGroup  (req, res)  {
    if(!req.body.name ){
      res.status(400).json({message:"name is required"});
    }
    else {
      Group.findOne ({
        where: {
          name: req.body.name, 
          userId: req.user.id      
        },
      }).then((group, err) => {
        if (err) {
          return res.status(400).json({message: err});

        } else if (group){
          return res.status(400).json({message: "Group already exists"});

        } else {
          Group.create({
            name: req.body.name,
            userId: req.user.id
          })
          .then(group => res.status(201).json({
            message: "Your group has been created", 
            name: group.name,
            id: group.id,
            adminId: group.userId})
          )
          .catch(error => res.status(400).send(error))
        }
      })
    }
  }
}
  

