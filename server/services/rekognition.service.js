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

async function cleanAllCollections(){
    const collections = await rekognition.listCollections().promise();

    for (let index = 0; index < collections.length; index++) {
        const element = collections[index];
        rekognition.deleteCollection({
            CollectionId: element
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }
}


function createCollection(collectionId){
    return rekognition.createCollection({
        CollectionId: collectionId
    }).promise();
}

rekognition.listFaces({
    CollectionId: "my-event-example",
}).promise()
.then(data => {
    console.log(data);
})

async function searchPhotosBySelfie(photo,folder) {
    console.log(photo,folder);
    rekognition.listFaces({
        CollectionId: folder,
    }).promise()
    .then(data => {
        console.log(data);
    })
    let result
    try {
        result = await rekognition.searchFacesByImage({
            CollectionId: folder,
            Image: {
                Bytes: photo
            }
        }).promise();
        console.log("RESULT BU RESULT",result);
    } catch (error) {
        console.log("Yüz yok",error);
    }
  
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

