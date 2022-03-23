const sequelize = require("../config/database.config");

const { Sequelize, DataTypes, Model } = require("sequelize");

class Customer extends Model {}

Customer.init(
  {
    // Model attributes are defined here
    faceId: {
      type: DataTypes.STRING,
      unique: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    timestamps: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Customer", // We need to choose the model name
  }
);
Customer.belongsTo(require("./event.model"));
//Customer.sync({force: true});


Customer.setGroup = async function (faceId, photos,EventId) {
  if (typeof photos === "string") photos = [photos];
  Customer.findOne({ where: { faceId } }).then((data) => {
    if (!data) {
        console.log("FOTOS : ",photos);
       Customer.create({
        faceId: faceId,
        photos: photos,
        EventId:EventId
      })
        .then((data) => {
          console.log(data);
          console.log("New Face Created");
        })
        .catch((err) => {
          console.log("KAYITTA SIKINTI ÇIKTI USTA",err);
        });
    } else {
      Customer
        .update({
            photos: [...data.dataValues.photos,...photos],
        },{
            where:{
                faceId
            }
        })
        .then((result) => {
          console.log("Photos Added to face", result);
        })
        .catch((err) => {
          console.log("HATA", err);
        });
    }
  }).catch((err) => {
    console.log("SETGROUP ERROR ",err);
  })
};

Customer.getGroup = async function (faceId) {
  console.log("GET GROUP", faceId);
  let face;
  try {
      console.log("BURADAAA BABAA");
    face = await Customer.findOne({ where: { faceId: faceId } });
    console.log("GET GROUP", face);
  } catch (error) {
      console.log("GET GROUP HATA", error);
  }
  return face?.photos || [];
};

//Customer.setGroup("0e0ada1d-d178-4e83-91c8-49fc450d44e3", []);

module.exports = Customer;
