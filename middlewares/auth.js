const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] == 'token') {
        return authorization.split(' ')[1];
    }

    return null;
}

const auth = {
    required: jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeaders,
    })
}

module.exports = auth;