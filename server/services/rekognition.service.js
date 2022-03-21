const { Rekognition, S3 } = require("aws-sdk");
require('dotenv').config()
const config = require('../config/aws.config')
const {getGroup} = require("../models/customer.model")
const fs = require('fs');
const path = require('path');
//new rekognition
const rekognition = new Rekognition({
    region: config.region,
});

function createCollection(collectionId){
    return rekognition.createCollection({
        CollectionId: collectionId
    }).promise();
}

async function searchPhotosBySelfie(photo,folder) {
    console.log(photo,folder);
    let result = await rekognition.searchFacesByImage({
        CollectionId: folder,
        Image: {
            Bytes: photo
        }
    }).promise();
    if(result.FaceMatches.length > 0){
        let faceId = result.FaceMatches[0].Face.FaceId;
        let results = await getGroup(faceId);
        console.log(results);
        return results;;
    }else{
        return [];
    }
 
}

module.exports = {searchPhotosBySelfie,rekognition,createCollection}

