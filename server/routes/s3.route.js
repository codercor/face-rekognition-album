const router = require('express').Router();
const grouping = require('../middlewares/grouping');
const uploadS3 = require("../middlewares/uploads3");
const uploadForSeperate = require("../middlewares/uploadForSeperate");

const s3Controller = require('../controllers/s3.controller');
const roles = ["admin", "uploader"];

//authentication and authorization middleware
const {checkToken} = require('../middlewares/auth');

router.use(checkToken);

//if you want to upload photos to folder in s3 you can use this endpoint [form-data] {file: file, folder: folder} [post]
router.post('/upload', uploadForSeperate.array("photos[]"), uploadS3, grouping, s3Controller.upload);
//get an image from s3 folder [get]
router.get("/getOne/:folder/:photo", s3Controller.getOne);
//get all images from s3 folder [get]
router.get("/getAll/:folder", s3Controller.getAll);

module.exports = router;
