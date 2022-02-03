const fs = require('fs');
const { Rekognition, S3 } = require('aws-sdk')
const config = require('../config/aws.config')





const rekognition = new Rekognition({
    region: config.region,
});
const s3 = new S3({
    region: config.region,
});
let bucket = `face-album-bucket`



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

let imageGroup = {}

function setGroup(faceId,imageKey){
    if(!imageGroup[faceId]){
        imageGroup[faceId] = [];
    }
    imageGroup[faceId].push(imageKey);
    fs.writeFileSync(path.resolve(`./groups.json`),JSON.stringify(imageGroup));
}

function getGroup(faceId){
    return imageGroup[faceId];
}



const seperateFaces = require("./seperateFaces");
const path = require('path');

module.exports = async function group(req, res, next) {
    let files = req.files;
    console.log("------------------------",files);
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let resim = await s3.getObject({
            Bucket: bucket,
            Key: file.key
        }).promise()
        fs.writeFileSync(path.resolve(`seperate/before/${file.originalname}`), resim.Body);
        await seperateFaces(path.resolve(`seperate/before/${file.originalname}`));
        let seperatedFaces = fs.readdirSync(path.resolve(`seperate/after`)).filter(item => item.includes(file.originalname));
        for (let j = 0; j < seperatedFaces.length; j++) {
            let theFace = seperatedFaces[j];
            let theFaceBuffer = fs.readFileSync(path.resolve(`seperate/after/${theFace}`));
            let whichFace = await rekognition.searchFacesByImage({
                CollectionId: `hizlandirma`,
                FaceMatchThreshold: 70,
                Image: {
                    Bytes: theFaceBuffer
                },
            }).promise();

            console.log("which Face", whichFace);
           
            if (whichFace.FaceMatches.length == 0) {
                let indexing = await rekognition.indexFaces({
                    CollectionId: `hizlandirma`,
                    Image: {
                        Bytes: theFaceBuffer
                    }}).promise();
                console.log("indexing", indexing);
                seperatedFaces.push(theFace)
            }else{
                console.log("Tanıyom");
                whichFace.FaceMatches[0].Face.FaceId ? setGroup(whichFace.FaceMatches[0].Face.FaceId,file.key) : null;
            }

        }
    }
    next();
}