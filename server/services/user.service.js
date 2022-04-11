const UserModel = require("../models/user.model");
const EventModel = require("../models/event.model");
module.exports.createUser = async function (user, ownerId) {
  const { name, username, password, phone, role } = user;
  try {
    let newUser = UserModel.newUser(
      name,
      username,
      password,
      phone,
      role,
      ownerId
    );
    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

