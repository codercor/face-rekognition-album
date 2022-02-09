const jwt = require('jsonwebtoken');

module.exports.checkToken = (req,res,next) => {
    //get token from header
    const token = req.headers['authorization'];
    //check if token is valid
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: 'Invalid token',
                    err
                })
            }
            req.user = decoded.user;
            next();
        })
    }else{
        return res.status(401).json({
            message: 'No token provided'
        })
    }
};