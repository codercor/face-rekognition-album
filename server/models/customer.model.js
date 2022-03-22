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
    timestamps: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Customer", // We need to choose the model name
  }
);

// the defined model is the class itself
console.log(Customer === sequelize.models.Customer); // true

//Customer.sync({force:true});

// async function testcon() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testcon()

// let AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// let AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// let AWS_REGION = process.env.AWS_REGION;

// dynamoose.aws.sdk.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION,
// });

// const CustomerSchema = new dynamoose.Schema(
//   {
//     faceId: {
//       type: String,
//       hashKey: true,
//     },
//     photos: {
//       type: Array,
//       schema: [String],
//     },
//     ttl: Number,
//   },
//   {
//     useDocumentTypes: true,
//     timestamps: true,
//     expires: {
//       attribute: "ttl",
//       ttl: 10000,
//     },
//   }
// );

// const Customer = dynamoose.model("Customer", CustomerSchema);

function getNowLinuxTimeStamp() {
  //decreare 8 hours
  let now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  return Math.floor(now.getTime() / 1000);
}

//get time for getNowLinuxTimeStamp() and add 2 minutes

Customer.setGroup = async function (faceId, photos) {
  if (typeof photos === "string") photos = [photos];
  Customer.findOne({ where: { faceId } }).then((data) => {
    if (!data) {
        console.log("FOTOS : ",photos);
       Customer.create({
        faceId: faceId,
        photos: photos,
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

//bu fonksiyon yani Customer.setGroup() fonksiyonu ile yüzünün kendi kümesine eklenmesi için kullanılır.
// Customer.setGroup = function (faceId, imageKeys) {
//   if (typeof imageKeys === "string") imageKeys = [imageKeys];
//   Customer.get(faceId).then((data) => {
//     if (!data) {
//       let newFace = new Customer({
//         faceId: faceId,
//         photos: imageKeys,
//         ttl: getNowLinuxTimeStamp(),
//       });

//       newFace
//         .save()
//         .then((data) => {
//           console.log(data);
//           console.log("New Face Created");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       let newPhotos = imageKeys.filter(
//         (imageKey) => !data.photos.includes(imageKey)
//       );
//       data.photos = [...data.photos, ...newPhotos];
//       data
//         .save()
//         .then((result) => {
//           console.log("Photos Added to face", result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
// };

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
