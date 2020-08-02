
const loginController = require('../controllers/auth/loginController');
// const registerController = require('../controllers/auth/registerController');
const positionController = require('../controllers/positionController');
const voteController = require('../controllers/voterController');
const startExpiryController = require('../controllers/startexpiryController');

module.exports = (router) => {
    router.post('/login', loginController.login);

    // router.post('/register', registerController.register);

    // get position
    router.get('/positions', positionController.getPositions);

    // create vote
    router.post('/vote', voteController.createVote)

    // get dates
    router.get('/dates', startExpiryController.getStartExpiry);

    return router;
};