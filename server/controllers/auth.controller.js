const User = require("../models/user.model");
const authService = require("../services/auth.service");


module.exports.login = (req, res) => {
    const { username , password} = req.body;
    User.login(username,password).then(user => {
        const token = authService.generateToken(user);
        console.log(token);
        delete user.password;
        res.status(200).json({
            token,
            user
        });
    }).catch(err => {
        console.log(err);
        res.json(err);
    } )
};
