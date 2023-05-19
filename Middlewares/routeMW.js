const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const teacherSchema = mongoose.model("Teacher")

module.exports.checkAdmin = (request, response, next) => {
  
  const decodedToken = decodeToken(request);
  const role = decodedToken.role;

  if (role == "admin") {
    next();
  } else {
    next(new Error("You have to be an admin to access this resource."));
  }
};

function decodeToken(request) {
  return jwt.verify(request.get("Authorization").split(" ")[1], "NurserySystem");
}

module.exports.checkTeacher = (request, response, next) => {
  const decodedToken = decodeToken(request)
  const role = decodedToken.role;
  if (role == "teacher") {
    next();
  } else {
    next(new Error("You have to be a teacher to access this resource."));
  }
};

module.exports.checkSameTeacher = async (request, response, next) => {
    const decodedToken = decodeToken(request)
    const email = decodedToken.userName; 
    let teacherId = request.params.id;

    if (decodedToken.role == "admin") {
        next()
        return;
    }

    if ( decodedToken.id != teacherId) {
        next( new Error("You cannot access data that does not belong to you."))
    } else {
        next()
    }
}