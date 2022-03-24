const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init({
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
        unique: true,
    },
}, {
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
});

//User.sync({ force: true });
User.roles = ["admin", "user","uploader"];

User.newUser = function (name, username, password, phone, role) {
    if (User.roles.indexOf(role) === -1) {
        return Promise.reject("Role is not valid");
    }
    let newUser = User.create({
        name,
        username,
        password,
        phone,
        role
    });
    return newUser;
}

//User.newUser("uploader", "uploader", "uploader", "uploader", "uploader");

User.deleteOne = function (id) {
    return User.deleteOne({ id });
}

User.updateOne = function (user) {
    return User.updateOne({ id: user.id }, user);
}

User.login = async function (username, password) {
    let result = await User.findOne({
        where: {
            username,
            password
        }
    });
    if(result === null){
        return Promise.reject("Username or password is incorrect");
    }else{
        return result;
    }
}

User.getOne = function (id) {
    return User.findOne({
        where: {
            id
        }
    });
}

//User.newUser("Selami","selo","selo123.","+923232323232","admin");

module.exports = User;