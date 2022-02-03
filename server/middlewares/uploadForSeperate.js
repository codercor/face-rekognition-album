const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'seperate/before')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, req.body.folder + '-' + uniqueSuffix+'.jpg')
      }
})
module.exports = multer({ storage: storage });