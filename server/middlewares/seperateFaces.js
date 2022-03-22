const sharp = require("sharp");
const canvas = require("canvas");


const { Rekognition, S3 } = require("aws-sdk");
const config = require("../config/aws.config");

const fs = require("fs");
const path = require("path");

const rekognition = new Rekognition({
  region: config.region,
});

module.exports = async function (imagePath) {

  //Detect faces in image
  try {
    data = await rekognition
      .detectFaces({
        Image: {
          Bytes: fs.readFileSync(imagePath),
        },
      })
      .promise();
      //face count
      console.log("FACE COUNT IS ",data.FaceDetails.length);
  } catch (error) {
    console.log("DETECT FACE ERROR",error);
      return;
  }


  //data like this : { FaceDetails: [ { FaceId: '1', BoundingBox: { Height: 0.5, Left: 0.5, Top: 0.5, Width: 0.5 }, Confidence: 99.99999809265137, Smile: { Confidence: 99.99999904632568, Value: true }, Eyeglasses: { Confidence: 99.99999904632568, Value: false }, Emotions: [ { Type: 'HAPPY', Confidence: 99.99999904632568 } ], EyesOpen: { Confidence: 99.99999904632568, Value: true }, MouthOpen: { Confidence: 99.99999904632568, Value: true },

  //for each face
  for (let i = 0; i < data.FaceDetails.length; i++) {
    let face = data.FaceDetails[i];
    {
      let faceBoundingBox = face.BoundingBox; // get face bounding box positions (x,y,width,height) data like : { Height: 0.5, Left: 0.5, Top: 0.5, Width: 0.5 }

    let sharpImage = sharp(imagePath);

    let imageMeta = await sharpImage.metadata();
      //computed crop sizes
      let sizes = {
        width: Number.parseInt(imageMeta.width * faceBoundingBox.Width),
        height: Number.parseInt(imageMeta.height * faceBoundingBox.Height),
        Left: Number.parseInt(imageMeta.width * faceBoundingBox.Left),
        Top: Number.parseInt(imageMeta.height * faceBoundingBox.Top),
      };
     
      //image name
      let imageName = imagePath.split("/");
      imageName = imageName[imageName.length - 1];
      try {
        await new Promise((resolve, reject) => {
          //create cropped image
         //crop image
         sharpImage.withMetadata().extract({
            left: sizes.Left,
            top: sizes.Top,
            width: sizes.width,
            height: sizes.height,
         })
            .toFile(path.resolve(`seperate/after/${imageName}-${i}.jpg`), (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            })
        });
      } catch (error) {
        console.log("CROP ERROR", error);
      }
    }
  }
  return;
};
