const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model } = require("sequelize");

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
    }
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
  }
);

User.roles = ["root", "admin", "user", "uploader"];

User.hasMany(User, {
    as: "Children",
    foreignKey: "ownerId",
    useJunctionTable: false,
});

//User.sync({ force: true});

User.findAll({}).then(users => console.log(users.map(user => user.dataValues)));



async function testData() {
    const user4 = User.create({ name: "user4", username: "user4", password: "user4", phone: "user4", role: "user",ownerId:2 });
}

//testData();

User.deleteById = function (id) {
  return User.destroy({ where: { id } });
};

//User.deleteById(2)

// User.updateOne = function (user) {
//     return User.updateOne({ id: user.id }, user);
// }

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

//User.newUser("Selami","selo","selo123.","+923232323232","admin");

module.exports = User;
