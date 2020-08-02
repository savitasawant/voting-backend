const usersController = require('../../controllers/usersController');
const positionController = require('../../controllers/positionController');
const startExpiryController = require('../../controllers/startexpiryController');

module.exports = (router) => {
  // User management
  router.post('/users', usersController.createUser);

  // create position
  router.post('/position', positionController.createPosition);

  // dates
  router.post('/dates', startExpiryController.createStartExpiry);
  router.get('/dates', startExpiryController.getStartExpiry);

  return router;
};
