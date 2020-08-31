const usersController = require('../../controllers/usersController');
const positionController = require('../../controllers/positionController');
const startExpiryController = require('../../controllers/startexpiryController');

module.exports = (router) => {
  // User management
  router.post('/node/users', usersController.createUser);

  // create position
  router.post('/node/position', positionController.createPosition);

  // dates
  router.post('/node/dates', startExpiryController.createStartExpiry);
  router.put('/node/dates/:id', startExpiryController.updateStartExpiry);
  

  return router;
};
