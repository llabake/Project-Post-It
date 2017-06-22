const messageController = require('../controllers/messageController');
const authMiddleware = require ('../middlewares/authMiddleware');

module.exports = (app) => {
  app.get('/api/group', (req, res) => res.status(200).send({
    message: 'Welcome to the group controller! You have to sign up',
  }));

  app.post('/api/group/<group id>/message', authMiddleware, messageController.sendMessageToGroup);
  app.get('/api/group/<group id>/messages', authMiddleware, messageController.retrieveMessageFromGroup);
  app.put('/api/group/<group id>/message', authMiddleware, messageController.updateMessageInGroup);
  app.delete('/api/group/<group id>/message', authMiddleware, messageController.deleteMessageFromGroup);

  
}