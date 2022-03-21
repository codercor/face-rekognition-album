const dynamoose = require("dynamoose");
const uuid = require('uuid');

let AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
let AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
let AWS_REGION = process.env.AWS_REGION;

dynamoose.aws.sdk.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
})

const EventSchema = new dynamoose.Schema({
    id:{
        type: String,
        hashKey: true,
        default: uuid.v4()  
    },
    name: {
        type: String,
        required: true
    },
    backgroundImage: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
});

const Event = dynamoose.model("Event", EventSchema)



Event.types = ["paid","free"];

Event.createEvent = function (name,backgroundImage,isPaid) {
    let newEvent = new Event({
        name,
        backgroundImage,
        isPaid
    });
    return newEvent.save();
}

Event.deleteOne = function (id) {
    return Event.delete(id);
}

Event.deleteOneByName = function (name) {
    return Event.scan().filter("name", "=", name).exec()
}




Event.updateOne = function (event) {
    let id = event.id;
    delete event.id;
    return Event.update(id, event);
}


Event.getOneByName = async function (name) {
    let result = await Event.scan("name").eq(name).exec();
    console.log(result);
    return result;
}

Event.getAll = function () {
    return Event.scan().exec();
}

module.exports = Event;