const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../../models/User');

passport.use(new localStrategy({
    usernameField: 'data[email]',
    passwordField: 'data[password]',
}, (email, password, done) => {
    User.findOne({ 'email': email, 'deleted_at': { $eq: null } }, (err, user) => {
        if (err) {
            return done(null, false, 'Something went wrong, try again later.');
        }
        else {
            if (!user) {
                return done(null, false, 'User not found.');
            }
            else if (!user.validatePassword(password)) {
                return done(null, false, 'Invalid credentials.');
            }
            else if (user.is_active === false) {
                return done(null, false, 'Your account has been deactived.')
            }
            return done(null, user);
        }
    })
}));

exports.login = function (req, res, next) {
    return passport.authenticate('local', { session: false }, (err, passport_user, info) => {
        if (err) {
            return res.status(401).send({ 'status': 'error', 'message': 'Something went wrong, try again later.' })
        }

        if (passport_user) {
            return res.json({ data: passport_user.toAuthJSON() })
        }

        return res.status(401).send({ 'status': 'error', 'message': info });
    })(req, res, next);
}