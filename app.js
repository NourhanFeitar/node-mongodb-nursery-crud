const express = require("express");
const morgan = require("morgan");
const TeacherApi = require("./routes/TeacherRoutes");
const mongoose = require("mongoose");
const classApi = require("./routes/ClassRoutes");
const ChildApi = require("./routes/ChildRoutes")
const loginrouter = require("./routes/authenticationRoutes");


const authmw = require("./Middlewares/authMW");
//Default export of express is function tht creates a server

const server = express();
server.use(morgan('tiny'));

//Connecting to MongoDb server.listen hena 3ashan nt2aked en el backend t2oom after db connection

( async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/NurserySystem")
  } catch(e) {
    console.log(e)
  }
})()

// let mongooseInstance = 
// if (mongooseInstance == null) {
//   throw new Exception("Db not connected");
// }



server.listen(8080, () => {
  console.log("Server is Listening");
});




server.use((request, response, next) => {
  if (true) {
    next();
  } else {
    response.json({ message: "You are not authorized." });
  }
});

server.use(express.json());

server.use(loginrouter); //authetication required before entering to class and teacher router

server.use(authmw.authenticate); // look for token
server.use(classApi);
server.use(TeacherApi);
server.use(ChildApi);


//middleware to write request url

//General middleware for not Foundurl patheswith 404 status code.

server.use((error, request, response, next) => {
  response.status(404);
  response.json({ message: error.message });
});

//One Error handling middleware that will catch all system Errors with 500 status code3

// server.use( (err, request, response, next) => {
//     if (response.headersSent) {
//         return next(err)
//     }

//     response.status(500);
//     response.json( {message: "Server error.", error: err})
// })
