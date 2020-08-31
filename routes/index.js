
const loginController = require('../controllers/auth/loginController');
// const registerController = require('../controllers/auth/registerController');
const positionController = require('../controllers/positionController');
const voteController = require('../controllers/voterController');
const startExpiryController = require('../controllers/startexpiryController');

module.exports = (router) => {
    router.post('/node/login', loginController.login);

    // router.post('/register', registerController.register);

    // get position
    router.get('/node/positions', positionController.getPositions);

    // create vote
    router.post('/node/vote', voteController.createVote)

    // get dates
    router.get('/node/dates', startExpiryController.getStartExpiry);

    return router;
};