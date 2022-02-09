const eventModel = require('../models/event.model');

module.exports.createEvent = async (req, res) => {
    const { name, backgroundImage, isPaid } = req.body;
    try {
        const event = await eventModel.createEvent(
            name,
            backgroundImage,
            isPaid
        )
        res.json(event)
    }catch (error) {
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
        res.json(event[0])
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateEvent = async (req, res) => {
    const eventData = req.body;
    try {
        const event = await eventModel.updateOne(eventData);
        res.json(event)
    } catch (error) {
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
    res.json({filename:req.file.filename})
}