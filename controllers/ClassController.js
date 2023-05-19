const mongoose = require("mongoose");
require("./../models/ClassModel");

const classSchema = mongoose.model("Class");

const getAll = (request, response, next) => {
  classSchema
    .find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      // catch always  has next
      next(error); // ab3to lel error middleware
    });

  // response.status(200).json({data:"list of Classes"});
};

const getOne = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id }) //3ashan fl controller el id fl params msh body
    .then((data) => {
      if (data == null) {
        throw new Error("No class with this id.");
      }
      response.status(200).json({ data });
    })
    .catch((error) => next(error));

  // response.status(200).json({data:"One Class"});
};

const createClass = (request, response, next) => {
  let object = new classSchema({
    _id: request.body.id,
    name: request.body.name,
    capacity: request.body.capacity,
  });

  object
    .save()
    .then((data) => response.status(201).json(data))
    .catch((error) => next(error));
};

const deleteClass = (request, response, next) => {
  classSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
        if ( data.deletedCount == 1) {
            response.status(200).json( { message: "Record has been deleted."})
        } else {
            throw new Error("Class with this id does not exist, no deletion occured.")
        }
      
    })
    .catch((error) => next(error));

  // respsone.status(200).json({message:"Remove Class "+request.params.id})
};

const updateClass = (request, response, next) => {
  classSchema
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          name: request.body.name,
          capacity: request.body.capacity,
        },
      }
    )
    .then((data) => {
        if (  data.matchedCount == 1) { // If you find the record
            if (data.modifiedCount == 1 ) { // If you changed the record
                response.status(200).json({ message: "Record has been updated."});
            }
            response.status(200).json({message: "The record has not changed."})
        } else {
            throw new Error("This class id does not exist.") // If you couldnt find the record
        }
        
    })
    .catch((error) => next(error));

  //respsone.status(200).json({message:"update Class"})
};

module.exports = {
  getAll,
  createClass,
  getOne,
  deleteClass,
  updateClass,
};
