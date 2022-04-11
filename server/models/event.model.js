const uuid = require("uuid");
//migrate to sequelize
const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model, Op } = require("sequelize");

const Customer = require("./customer.model");
const User = require("./user.model");

class Event extends Model {}

Event.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    backgroundImage: {
      type: DataTypes.STRING,
      unique: true,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      unique: false,
    },
    ownerId:{
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
    charset: "utf8",
    collate: "utf8_general_ci",
    sequelize,
    modelName: "Event"
  }
);
Event.hasMany(Customer,{
  as: "Customers",
  foreignKey: "eventId",
  useJunctionTable: false,
  onDelete: "CASCADE",
});

//Event.sync({ force: true });

Event.createEvent = function (name, backgroundImage, isPaid, ownerId) {
  let newEvent = Event.create({
    name,
    backgroundImage,
    isPaid,
    ownerId,
  });
  return newEvent;
};

Event.deleteOne = function (id) {
  return Event.destroy({ where: { id } });
};

Event.deleteOneByName = function (name) {
  return Event.destroy({ where: { name } });
};

Event.updateOne = function (event) {
  let id = event.id;
  delete event.id;
  return Event.update(event, { where: { id } });
};

Event.getOneByName = async function (name) {
  let result = await Event.findOne({ where: { name } });
  console.log(result);
  return result;
};

Event.getAll = function () {
  return Event.findAll({});
};

Event.getEventIdByName = async function (name) {
  let result = await Event.findOne({ where: { name } });
  return result.id;
};

Event.getEventsByUser = async function (user) {
  //find all event userId or ownerId
  let result =  await Event.findAll({
    where: {
      [Op.or]: [{ ownerId: user.id }, { ownerId: user.ownerId }],
    },
  });
  return result;
}

module.exports = Event;
