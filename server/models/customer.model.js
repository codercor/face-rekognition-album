const dynamoose = require("dynamoose");

let AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
let AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
let AWS_REGION = process.env.AWS_REGION;

dynamoose.aws.sdk.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
})

const CustomerSchema = new dynamoose.Schema({
    faceId: {
        type: String,
        hashKey: true
    },
    photos: {
        type: Array,
        schema: [String]
    },
    ttl: Number
}, {
    useDocumentTypes: true,
    timestamps: true,
    expires:{
        attribute: "ttl",
        ttl: 10000
    }
});

const Customer = dynamoose.model("Customer", CustomerSchema)

function getNowLinuxTimeStamp(){
    //decreare 8 hours
    let now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    return Math.floor(now.getTime() / 1000);
}

console.log("linux time stamp", getNowLinuxTimeStamp());

//get time for getNowLinuxTimeStamp() and add 2 minutes

Customer.setGroup = function (faceId, imageKeys) {
    if (typeof (imageKeys) === "string") imageKeys = [imageKeys];
    Customer.get(faceId).then(data => {
        if (!data) {
            let newFace = new Customer({
                faceId: faceId,
                photos: imageKeys,
                ttl: getNowLinuxTimeStamp()
            });

            newFace.save().then(data => {
                console.log(data);
                console.log("New Face Created");
            }).catch(err => {
                console.log(err);
            })
        } else {
            let newPhotos = imageKeys.filter(imageKey => !data.photos.includes(imageKey))
            data.photos = [...data.photos, ...newPhotos];
            data.save().then(result => {
                console.log("Photos Added to face", result);
            }).catch(err => {
                console.log(err);
            })
        }
    });
}


Customer.getGroup = async function (faceId) {
    console.log("GET GROUP", faceId);
    let face = await Customer.get(faceId);
    return face?.photos || [];
}

//Customer.setGroup("0e0ada1d-d178-4e83-91c8-49fc450d44e3", []);


Customer.scan().exec().then(data => {
    console.log(data.length);
})

module.exports = Customer;