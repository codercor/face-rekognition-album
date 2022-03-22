const uuid = require("uuid");
//migrate to sequelize
const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model } = require("sequelize");

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
      unique: true,
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
  }
);

//Event.sync({ force: true });

Event.createEvent = function (name, backgroundImage, isPaid) {
  let newEvent = Event.create({
    name,
    backgroundImage,
    isPaid,
  });
  return newEvent;
};

Event.deleteOne = function (id) {
  return Event.deleteOne({ id });
};

Event.deleteOneByName = function (name) {
  return Event.deleteOne({ name });
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

module.exports = Event;
