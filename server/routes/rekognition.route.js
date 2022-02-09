const router = require('express').Router();
const uploadSelfie = require('../middlewares/uploadSelfie');

const rekognitionController = require('../controllers/rekognition.controller');


router.post( "/searchFace",uploadSelfie.single("selfie"),rekognitionController.searchFace)

module.exports = router;