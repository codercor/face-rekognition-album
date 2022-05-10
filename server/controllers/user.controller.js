const userService = require("../services/user.service")

//if you want to upload photos to folder in s3 you can use this endpoint [form-data] {file: file, folder: folder} [post]
module.exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body,req.user.id);
        res.status(200).json(user);
    } catch (err) {
        console.log("Create user error: ", err);
        res.status(500).json(err);
    }
}
module.exports.getSubUsers= async (req, res) => {
    try {
        const users = await userService.getSubUsers(req.user.id);
        res.status(200).json(users);
    } catch (err) {
        console.log("Get sub users error: ", err);
        res.status(500).json(err);
    }
}
module.exports.deleteSubUser= async (req, res) => {
    try {
        const user = await userService.deleteSubUser(req.params.id,req.user.id);
        res.status(200).json(user);
    } catch (err) {
        console.log("Delete sub user error: ", err);
        res.status(500).json(err);
    }
}