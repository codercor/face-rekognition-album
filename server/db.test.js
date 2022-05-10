const User = require("./models/user.model");
const Event = require("./models/event.model");
const Customer = require("./models/customer.model");

const fs = require("fs");

function writeToLog(log){
    fs.appendFile("log.txt", log, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


async function test(){
    return;
    console.time("my test");
    console.log("TEST STARTED");
    await User.sync({force: true});
    await Event.sync({force: true});
    await Customer.sync({force: true});
    let root = await User.create({ name:'root', username:'root', password:'root', phone:'root', role:'root', ownerId:1 })
    let admin = await User.create({ name:'admin', username:'admin', password:'admin', phone:'admin', role:'admin', ownerId:root.get().id})
    let uploader = await User.create({ name:'uploader', username:'uploader', password:'uploader', phone:'uploader', role:'uploader', ownerId:admin.get().id})
    let event1 = await Event.createEvent('event1', 'event1.jpg', false, admin.get().id);
    let event2 = await Event.createEvent('event2', 'event2.jpg', false, admin.get().id);
    let admin1 = await User.create({ name:'admin1', username:'admin1', password:'admin1', phone:'admin1', role:'admin', ownerId:root.get().id})
    let event3 = await Event.createEvent('event3', 'event3.jpg', false, admin1.get().id);
    const customer1 = await Customer.create({
       faceId: "123",
       photos: ["1.jpg", "2.jpg"],
         eventId: event1.get().id,
    })
    const customer2 = await Customer.create({
         faceId: "456",
            photos: ["3.jpg", "4.jpg"],
            eventId: event1.get().id,
    })
       
    const customer3 = await Customer.create({
            faceId: "789",
            photos: ["5.jpg", "6.jpg"],
            eventId: event2.get().id,
    })

    const customer4 = await Customer.create({
            faceId: "101112",
            photos: ["7.jpg", "8.jpg"],
            eventId: event3.get().id,
    })
    console.log("DATA CREATED FINISHED");
    // setTimeout(() => {
    //     User.deleteById(admin.get().id).then(() => {
    //         console.log("admin deleted check it");
    //     });
    // }, 15000);
    
}
module.exports = test;