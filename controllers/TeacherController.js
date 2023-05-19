const mongoose = require("mongoose");
require("./../models/TeacherModel");
const bcrypt = require("bcrypt");

const teacherSchema = mongoose.model("Teacher");

const getAll = (request, response, next) => {
  teacherSchema
    .find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      // catch always  has next
      next(error); // ab3to lel error middleware
    });
};

const getOne = (request, response, next) => {
  teacherSchema
    .findOne({ _id: request.params.id }) //3ashan fl controller el id fl params msh body
    .then((teacher) => {
      if (teacher == null) {
        throw new Error("Teacher Does Not Exist In Database");
      }
      response.status(200).json(teacher);
    })
    .catch((error) => next(error)); // byrg3li null and i need to be more specific so i throw error
};

const createTeacher = (request, response, next) => {
  var hashpassword = "";
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(request.body.password, salt, function (err, hash) {
      hashpassword = hash;
      let object = new teacherSchema({
        _id: request.body.id,
        name: request.body.name,
        subject: request.body.subject,
        //hashing and encrypting password password

        password: hashpassword,

        email: request.body.email,
      });

      object
        .save()
        .then((data) => response.status(201).json({ data }))
        .catch((error) => next(error));
    });
  });
};

const deleteTeacher = (request, response, next) => {
  teacherSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 1) {
        response.status(200).json({ message: "Deleted succesfully." });
      }
      response.status(404).json({ message: "Not found." });
    })
    .catch((error) => next(error));
};

const updateTeacher = (request, response, next) => {
  teacherSchema
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          name: request.body.name,
          subject: request.body.subject,
          email: request.body.email,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 1) {
        // If you find the record
        if (data.modifiedCount == 1) {
          // If you changed the record
          response.status(200).json({ message: "Record has been updated." });
        }
        response.status(200).json({ message: "The record has not changed." });
      } else {
        throw new Error("This teacher id does not exist."); // If you couldnt find the record
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  getAll,
  createTeacher,
  getOne,
  deleteTeacher,
  updateTeacher,
};
