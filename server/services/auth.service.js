const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: '8h'
    });
};