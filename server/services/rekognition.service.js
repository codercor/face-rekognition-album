const { Rekognition, S3 } = require("aws-sdk");
require('dotenv').config()
const config = require('../config/aws.config')

//new rekognition
const rekognition = new Rekognition({
    region: config.region,
});


let fs = require('fs');
const path = require("path");


async function searchPhotosBySelfie(photo,folder) {
    console.log(photo,folder);
    let result = await rekognition.searchFacesByImage({
        CollectionId: folder,
        Image: {
            Bytes: photo
        }
    }).promise();
    let faceId = result.FaceMatches[0].Face.FaceId;
    let results = JSON.parse(fs.readFileSync(path.resolve(__dirname+"/../groups.json")));
    let group = results[faceId];
    return group;
}

module.exports = {searchPhotosBySelfie,rekognition}

