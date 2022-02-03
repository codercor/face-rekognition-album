const fs = require('fs');
const { Rekognition, S3 } = require('aws-sdk')
const config = require('../config/aws.config')





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

let imageGroup = {}

function setGroup(faceId, imageKey) {
    if (!imageGroup[faceId]) {
        imageGroup[faceId] = [];
    }
    imageGroup[faceId].push(imageKey);
    fs.writeFileSync(path.resolve(`./groups.json`), JSON.stringify(imageGroup));
}

function getGroup(faceId) {
    return imageGroup[faceId];
}



const seperateFaces = require("./seperateFaces");
const path = require('path');

module.exports = async function group(req, res, next) {
    let files = req.files;
    console.log("------------------------", files);
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log("START SEPERATE");
        let x = await seperateFaces(path.resolve(`seperate/before/${file.filename}`));
        console.log("END SEPERATE");
        let afterFiles = fs.readdirSync(path.resolve(`seperate/after`));
        console.log("AFTER FİLES", afterFiles);
        let seperatedFaces = afterFiles.filter(item => item.includes(file.filename));
        console.log("SEPERATED FACES", seperatedFaces);
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
                    }
                }).promise();
                console.log("indexing", indexing);
                seperatedFaces.push(theFace)
            } else {
                console.log("Tanıyom");
                whichFace.FaceMatches[0].Face.FaceId ? setGroup(whichFace.FaceMatches[0].Face.FaceId, file.key) : null;
            }
            console.log("THE FACE", theFace);
        }
        fs.unlinkSync(path.resolve(`seperate/before/${file.filename}`));
        for (let j = 0; j < seperatedFaces.length; j++) {
            let theFace = seperatedFaces[j];
            fs.unlinkSync(path.resolve(`seperate/after/${theFace}`));
        }
    }
    next();
}