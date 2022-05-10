const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'seperate/before')
      },
      filename: function (req, file, cb) {
        const newname = req.body.folder + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+'.jpg';
        cb(null, newname)
      }
})
module.exports = multer({ storage: storage });