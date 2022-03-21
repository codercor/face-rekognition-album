const multer = require('multer');
const uuid = require('uuid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/backgrounds')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuid.v4()
    cb(null, uniqueSuffix + '.jpg')
  }
})
module.exports = multer({ storage: storage });