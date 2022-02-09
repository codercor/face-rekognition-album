const router = require('express').Router();
const eventController = require('../controllers/event.controller');

const { checkToken } = require("../middlewares/auth");
const uploadBackgroundImage = require('../middlewares/uploadBackgroundImage');




router.route('/').get(checkToken,eventController.getEvents).post(checkToken,eventController.createEvent);

router.route('/uploadBG').post(checkToken,uploadBackgroundImage.single("image"),eventController.uploadBackgroundImage);

router.route('/:name')
.get(eventController.getEvent)
.delete(checkToken,eventController.deleteEvent)
.put(checkToken,eventController.updateEvent);

module.exports = router;