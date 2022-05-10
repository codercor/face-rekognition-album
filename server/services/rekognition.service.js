const { Rekognition, S3 } = require("aws-sdk");
require("dotenv").config();
const config = require("../config/aws.config");
const { getGroup } = require("../models/customer.model");
const fs = require("fs");
const path = require("path");
//new rekognition
const rekognition = new Rekognition({
  region: config.region,
});

// rekognition.createCollection({
//     CollectionId: "my-event-example"
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

async function cleanAllCollections() {
  const collections = (await rekognition.listCollections().promise())
    .CollectionIds;
  for (let index = 0; index < collections.length; index++) {
    const element = collections[index];
    await rekognition
      .deleteCollection({
        CollectionId: element,
      })
      .promise();
  }
}

const resetCollections = async () => {
  await cleanAllCollections();
  await createCollection("aa");
  console.log("collection resfreshed");
};

//resetCollections();

// cleanAllCollections().then(()=>{
//     console.log("done")
// }).catch(err=>{
//     console.log(err)
// })

function createCollection(collectionId) {
  return rekognition
    .createCollection({
      CollectionId: collectionId,
    })
    .promise();
}

async function searchPhotosBySelfie(photo, folder) {
  let result;
  try {
    let collections = await rekognition.listCollections().promise();
    console.log("collections", collections);
    result = await rekognition
      .searchFacesByImage({
        CollectionId: folder,
        Image: {
          Bytes: photo,
        },
      })
      .promise();
    console.log("RESULT BU RESULT", result);
  } catch (error) {
    console.log("Yüz yok", error);
  }

  if (result.FaceMatches.length > 0) {
    let faceId = result.FaceMatches[0].Face.FaceId;
    let results = await getGroup(faceId);
    console.log(results);
    return results;
  } else {
    return [];
  }
}

module.exports = { searchPhotosBySelfie, rekognition, createCollection };
