const express = require('express');
const routes = require('./routes');
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(require('cors')());
//public dir
app.use("/public",express.static('public'));


app.use('/s3', routes.s3Router);
app.use('/rekognition',routes.rekognitionRouter);
app.use('/auth',routes.authRouter);
app.use('/event',routes.eventRouter);
app.use('/user',routes.userRouter);


app.listen(3001, () => {
  console.log('listening on port 3000 -> http://localhost:3000');
  //require("./db.test")();
});