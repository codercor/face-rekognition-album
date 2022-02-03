const { S3 } = require("aws-sdk")
require("dotenv").config();
const fs = require("fs");
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});
const upload = async (req, res, next) => {

  console.log("UPLOAD S3 ");

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    file.key = req.body.folder + '/' + file.filename;
    try {
      await s3.upload({
        Bucket: 'face-album-bucket',
        Key: file.key,
        Body: fs.readFileSync(file.path),
      }).promise();
      console.log(`File uploaded successfully. ${file.originalname}`);
    } catch (error) {
      console.log(error.message);
    }
  }
  next();
}

module.exports = upload;