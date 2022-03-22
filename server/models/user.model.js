// const dynamoose = require("dynamoose");

// let AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// let AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// let AWS_REGION = process.env.AWS_REGION;

// dynamoose.aws.sdk.config.update({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION,
// })

// const UserSchema = new dynamoose.Schema({
//     id:{
//         type: String,
//         hashKey: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true
//     }
// });

// const User = dynamoose.model("User", UserSchema)


// User.roles = ["admin", "user","uploader"];

// User.newUser = function (name, username, password, phone, role) {
//     if (User.roles.indexOf(role) === -1) {
//         return Promise.reject("Role is not valid");
//     }
//     let newUser = new User({
//         name,
//         username,
//         password,
//         phone,
//         role
//     });
//     return newUser.save();
// }

// User.deleteOne = function (id) {
//     return User.delete(id);
// }

// User.updateOne = function (user) {
//     return User.update(user.id, user);
// }

// User.login = async function (username, password) {
//     let result = await User.scan({
//         "username": {
//             "eq": username
//         },
//         "password": {
//             "eq": password
//         }
//     }).exec();
//     if(result.count  === 0){
//         return Promise.reject("Username or password is incorrect");
//     }else{
//         return result[0];
//     }
// }

// User.getOne = function (id) {
//     return User.get(id);
// }

// module.exports = User;

//migrate to postgres with sequelize

//migrate to sequelize
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