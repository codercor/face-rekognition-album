const fs = require("fs");
const { Rekognition, S3 } = require("aws-sdk");
const config = require("../config/aws.config");

const EventModel = require("../models/event.model");

const rekognition = new Rekognition({
  region: config.region,
});

// rekognition.deleteCollection({
//     CollectionId: `hizlandirma`,
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// rekognition.listFaces({
//     CollectionId: `hizlandirma`
// }).promise().then(data => {
//     console.log(data.Faces.length);
// })

// rekognition.createCollection({
//     CollectionId: `hizlandirma`,
// }).promise().then(data => {
//     console.log(data);
// })

const { setGroup } = require("../models/customer.model");

const seperateFaces = require("./seperateFaces");
const path = require("path");

module.exports = async function group(req, res, next) {
  let files = req.files;
  let collectionId = req.body.folder;
  let eventId;
  try {
    eventId = await EventModel.getEventIdByName(collectionId);
  } catch (error) {
    res.status(500).json({
      message: "Event bulunamadı",
      error,
    });
  }
  console.log("------------------------", files);
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    console.log("START SEPERATE");
    let x = await seperateFaces(
      path.resolve(`seperate/before/${file.filename}`)
    );
    console.log("END SEPERATE");
    let afterFiles = fs.readdirSync(path.resolve(`seperate/after`))
    //delete the text.txt file
    afterFiles = afterFiles.filter((file) => file !== ".gitkeep");
    console.log("AFTER FİLES", afterFiles);
    let seperatedFaces = afterFiles.filter((item) =>
      item.includes(file.filename)
    );
    console.log("SEPERATED FACES", seperatedFaces);
    for (let j = 0; j < seperatedFaces.length; j++) {
      let theFace = seperatedFaces[j];
      let theFaceBuffer = fs.readFileSync(
        path.resolve(`seperate/after/${theFace}`)
      );
      let whichFace;
      try {
        whichFace = await rekognition
          .searchFacesByImage({
            CollectionId: collectionId,
            FaceMatchThreshold: 70,
            Image: {
              Bytes: theFaceBuffer,
            },
          })
          .promise();
      } catch (error) {
        let collectionList = await rekognition.listCollections({}).promise();
        if (collectionList.CollectionIds.includes(collectionId)) {
          console.log("YÜZ İNDEXLEME HATASI", error);
        } else {
          await rekognition
            .createCollection({
              CollectionId: collectionId,
            })
            .promise();
          whichFace = await rekognition
            .searchFacesByImage({
              CollectionId: collectionId,
              FaceMatchThreshold: 70,
              Image: {
                Bytes: theFaceBuffer,
              },
            })
            .promise();
        }
        continue;
      }

      if (whichFace.FaceMatches.length == 0) {
        let indexing = await rekognition
          .indexFaces({
            CollectionId: collectionId,
            Image: {
              Bytes: theFaceBuffer,
            },
          })
          .promise();
        console.log("indexing", indexing);
        seperatedFaces.push(theFace);
      } else {
        console.log("Tanıyom");
        whichFace.FaceMatches[0].Face.FaceId
          ? await setGroup(
              whichFace.FaceMatches[0].Face.FaceId,
              file.key,
              eventId
            )
          : null;
      }
      console.log("THE FACE", theFace);
    }
    fs.unlinkSync(path.resolve(`seperate/before/${file.filename}`));
    for (let j = 0; j < seperatedFaces.length; j++) {
      let theFace = seperatedFaces[j];
      console.log("BURAYA GELDI");
      try {
        fs.unlinkSync(path.resolve(`seperate/after/${theFace}`));
      } catch (error) {
        console.log("AFTER SİLME HATASI :" + theFace);
      }
    }
  }
  next();
};
