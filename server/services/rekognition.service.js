const { Rekognition, S3 } = require("aws-sdk");
require('dotenv').config()
const config = require('../config/aws.config')
const {getGroup} = require("../models/customer.model")
//new rekognition
const rekognition = new Rekognition({
    region: config.region,
});



async function searchPhotosBySelfie(photo,folder) {
    console.log(photo,folder);
    let result = await rekognition.searchFacesByImage({
        CollectionId: folder,
        Image: {
            Bytes: photo
        }
    }).promise();
    let faceId = result.FaceMatches[0].Face.FaceId;
    let results = await getGroup(faceId);
    console.log(results);
    return results;
}

module.exports = {searchPhotosBySelfie,rekognition}

