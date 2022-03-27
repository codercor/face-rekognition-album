const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model } = require("sequelize");

const Event = require("./event.model");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      unique: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      unique: false,
      defaultValue: 1,
    },
  },
  {
    created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updated_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    sequelize,
    modelName: "User",
  }
);

//User.sync({ force: true });

User.roles = ["root", "admin", "user", "uploader"];

User.hasMany(User, {
  as: "Personnel",
  foreignKey: "ownerId",
  useJunctionTable: false,
});
User.hasMany(Event, {
  as: "Events",
  foreignKey: "ownerId",
  useJunctionTable: false,
});

User.deleteById = function (id) {
  return User.destroy({ where: { id } });
};

User.newUser = function (name, username, password, phone, role, ownerId) {
  if (User.roles.indexOf(role) === -1) {
    return Promise.reject("Role is not valid");
  }
  let newUser = User.create({
    name,
    username,
    password,
    phone,
    role,
    ownerId,
  });
  return newUser;
};

User.login = async function (username, password) {
  let result = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (result === null) {
    return Promise.reject("Username or password is incorrect");
  } else {
    return result;
  }
};

User.getOne = function (id) {
  return User.findOne({
    where: {
      id,
    },
  });
};

// User.findAll({}).then((users) => { console.log(users.map((user)=>user.get())) });

module.exports = User;
