const {Config} = require("aws-sdk")
require('dotenv').config();
//console.log("ENV : ",process.env.AWS_SECRET_ACCESS_KEY,process.env.AWS_ACCESS_KEY_ID, process.env.AWS_REGION);
module.exports = new Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})