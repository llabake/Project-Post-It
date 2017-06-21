const groupController = require('../controllers/groupController');
const authMiddleware = require ('../middlewares/authMiddleware');

module.exports = (app) => {
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Welcome to the group controller! You have to sign up',
  }));

  app.post('/api/group/', authMiddleware, groupController.createGroup);
  // app.post('/api/group/<group id>', groupController.addUser);
  
}


