const userGroupController = require('../controllers/userGroupController');
const authMiddleware = require ('../middlewares/authMiddleware');

module.exports = (app) => {
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Welcome to the group controller! You have to sign up',
  }));

  app.post('/api/group/:group_id/user/', authMiddleware, userGroupController.addUserToGroup);
  app.delete('/api/group/:group_id/user/', authMiddleware,  userGroupController.removeUserFromGroup);

  
}