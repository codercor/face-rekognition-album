const eventModel = require('../models/event.model');
const { createCollection } = require('../services/rekognition.service')

module.exports.createEvent = async (req, res) => {
    const { name, backgroundImage, isPaid } = req.body;
    try {
        const event = await eventModel.createEvent(
            name,
            backgroundImage,
            eval(isPaid),
            req.user.id
        )
       await createCollection(name);
        res.json(event)
    }catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports.getEvents = async (req, res) => {
    try {
        const events = await eventModel.getAll();
        res.json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getEvent = async (req, res) => {
    const { name } = req.params;
    try {
        const event = await eventModel.getOneByName(name);
        if(!event) throw new Error("Event bulunamad─▒");
        res.json(event)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateEvent = async (req, res) => {
    const eventData = req.body;
    console.log("Event Data  :",eventData);
    try {
        const event = await eventModel.updateOne(eventData);
        res.json(event)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports.deleteEvent = async (req, res) => {
    const name = req.params.name;
    try {
        const event = await eventModel.deleteOneByName(name);
        res.json(event)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.uploadBackgroundImage = async (req, res) => {
    console.log("request");
    console.log(req.file);
    res.json({filename:req.file.filename})
}

module.exports.getUserEvents = async (req, res) => {
    try {
        const events = await eventModel.getEventsByUser(req.user);
        res.status(200).json(events);
    } catch (err) {
        console.log("Get events error: ", err);
        res.status(500).json(err);
    }
}