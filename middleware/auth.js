const jwt = require('jsonwebtoken');
const config = require('config');


// A middleware function is a function that
// has access to the request and response object/cycle
// next is function that we have to run in order to run
// the next middleware

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        // 401 - not found
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}