const groupController = require('../controllers/groupController');

module.exports = (app) => {
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Welcome to the group controller! You have to sign up',
  }));

  app.post('/api/group', groupController.createGroup);
  app.get('/api/group/<group id>', groupController.addUser);
  
}