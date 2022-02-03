
var Clipper = require('image-clipper')
const canvas = require('canvas');
Clipper.configure('canvas', canvas);
const { Rekognition, S3 } = require('aws-sdk')
const config = require('../config/aws.config')

const fs = require('fs');
const path = require('path');



const rekognition = new Rekognition({
    region: config.region,
});

module.exports = async function (imagePath) {

    //Detect faces in image
    let data = await rekognition.detectFaces({
        Image: {
            Bytes: fs.readFileSync(imagePath)
        }
    }).promise()
    console.log(data);

    //data like this : { FaceDetails: [ { FaceId: '1', BoundingBox: { Height: 0.5, Left: 0.5, Top: 0.5, Width: 0.5 }, Confidence: 99.99999809265137, Smile: { Confidence: 99.99999904632568, Value: true }, Eyeglasses: { Confidence: 99.99999904632568, Value: false }, Emotions: [ { Type: 'HAPPY', Confidence: 99.99999904632568 } ], EyesOpen: { Confidence: 99.99999904632568, Value: true }, MouthOpen: { Confidence: 99.99999904632568, Value: true },    

    //for each face
    for (let i = 0; i < data.FaceDetails.length; i++) {
        let face = data.FaceDetails[i];
        {
            let faceBoundingBox = face.BoundingBox; // get face bounding box positions (x,y,width,height) data like : { Height: 0.5, Left: 0.5, Top: 0.5, Width: 0.5 }

            const imageData = fs.readFileSync(imagePath); // read image data
            let image = new canvas.Image(); // create canvas image for read image size data
            image.src = imageData;

            //computed crop sizes 
            let sizes = {
                width: image.width * faceBoundingBox.Width,
                height: image.height * faceBoundingBox.Height,
                Left: image.width * faceBoundingBox.Left,
                Top: image.height * faceBoundingBox.Top
            }

            //image name
            let imageName = imagePath.split('\\');
            imageName = imageName[imageName.length - 1];

            await new Promise((resolve, reject) => {
                //create cropped image
                Clipper(imagePath, function () {
                    this.crop(sizes.Left, sizes.Top, sizes.width, sizes.height)
                        .quality(100) // set quality
                        .toFile(path.resolve(`seperate/after/${imageName}-${i}.jpg`), function () {
                            //save cropped image to seperate/after folder
                            console.log('saved!');
                            resolve();
                        });
                });
            })
        }
    }
    return;
}
