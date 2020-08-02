
const loginController = require('../controllers/auth/loginController');
// const registerController = require('../controllers/auth/registerController');
const positionController = require('../controllers/positionController');
const voteController = require('../controllers/voterController');

module.exports = (router) => {
    router.post('/login', loginController.login);

    // router.post('/register', registerController.register);

    // get position
    router.get('/positions', positionController.getPositions);

    // create vote
    router.post('/vote', voteController.createVote)

    return router;
};