module.exports = {
    deleteUserFromGroup  (req, res,next)  {
      if(!req.body.name) {
        res.json({message:"name of user to be removed is required"}).status(400);
      }
      else {
          Group.findOne ({
              id: req.params.name
            })
            if (!(name)) {
                return res.status(404).json({
                error: "User not found"
            })
        } else ((req.body.name != req.params.name) ||(req.body.userId != req.params.userId)) {
            return res.status(403).json({
                message: "Permission denied"
            });
        }

    }
}

