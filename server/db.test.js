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
    console.time("my test");
    console.log("TEST STARTED");
    await User.sync({force: true});
    await Event.sync({force: true});
    await Customer.sync({force: true});
    User.create({ name:'root', username:'root', password:'root', phone:'root', role:'root', ownerId:1 })
    .then(user => {
        console.log(user.get());
        return User.create({ name:'admin', username:'admin', password:'admin', phone:'admin', role:'admin', ownerId:1 });
    }).then(user => {
        console.log(user.get());
        return Event.create({ name:'event1', backgroundImage:'event1', isPaid:true, ownerId:user.get().id });
    }).then(event => {
        console.log(event.get());
        return Customer.create({ faceId:"dada", photos:["1","2"], eventId:event.get().id });
    }).then((customer) => {
        console.log(customer.get());
        console.log("insert done");
        return User.findAll();
    }).then(users => {
        console.log("USERS");
        console.log(users.map(user => user.get()));
        return Event.findAll();
    }).then(events => {
        console.log("EVENTS");
        console.log(events.map(event => event.get()));
        return Customer.findAll();
    })
    .then(customers => {
        console.log("CUSTOMERS");
        console.log(customers.map(customer => customer.get()));
        console.log("READING DONE");
    }).then(() => {
        return User.deleteById(2);
    }).then(() => {
        return User.findAll();
    }).then(users => {
        console.log("USERS");
        console.log(users.map(user => user.get()));
        return Event.findAll();
    }).then(events => {
        console.log("EVENTS");
        console.log(events.map(event => event.get()));
        return Customer.findAll();
    }).then(customers => {
        console.log("CUSTOMERS");
        console.log(customers.map(customer => customer.get()));
        console.log("READING DONE");
        console.timeEnd("my test");
    })
    .catch(err => {
        console.log("TEST ERROR",err);
    })

}
module.exports = test;