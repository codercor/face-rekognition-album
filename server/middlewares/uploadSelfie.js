const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("destination",file);
        cb(null, 'public/selfies')
      },
      filename: function (req, file, cb) {
        console.log("MİDDLE WAREEEE !!!! ",file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        req.diskFileName = uniqueSuffix;
        cb(null, uniqueSuffix+'.jpg')
      }
})
module.exports = multer({ storage: storage });