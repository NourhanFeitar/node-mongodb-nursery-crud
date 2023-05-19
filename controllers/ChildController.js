const mongoose = require("mongoose");
require("./../models/ChildModel");

const childSchema = mongoose.model("Children");
const classSchema = mongoose.model("Class");

const getAll = (request, response, next) => {
  childSchema
    .find({})
    .populate({
      path: "class",
      select: { name: 1, _id: 0 },
      strictPopulate: false,
    }) // now hygbli data el class kolaha   in this case shows name and id only
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      // catch always  has next
      next(error); // ab3to lel error middleware
    });
};

const getOne = (request, response, next) => {
  childSchema
    .findOne({ _id: request.params.id }) //3ashan fl controller el id fl params msh body
    .populate({
      path: "class",
      select: { name: 1, _id: 0 },
      strictPopulate: false,
    })
    .then((child) => {
      if (child == null) {
        throw new Error("Child does not exist in database.");
      }
      response.status(200).json(child);
    })
    .catch((error) => next(error));

  //response.status(200).json({data:"One Child"});
};

const createChild = (request, response, next) => {
  //let object = new childSchema({_id:1,name:"Laila", Department:"Maths"});// for testing

  console.log(classSchema);
  classSchema
    .find({ _id: request.body.class })
    .then((clazz) => {
      if (clazz.length == 0) {
        throw new Error("Class Does Not Exist");
      }

      let object = new childSchema({
        _id: request.body.id,
        name: request.body.name,
        class: request.body.class,
      }); //Check to see if dep exists

      return object.save();
    })
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => next(error));

  // console.log(request.body);
  // respsone.status(201).json({message:"Add Child"})
};

const deleteChild = (request, response, next) => {
  childSchema
    .deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 1) {
        response.status(200).json({ message: "Record has been deleted." });
      } else {
        throw new Error(
          "Class with this id does not exist, no deletion occured."
        );
      }

    })
    .catch((error) => next(error));

  //respsone.status(200).json({message:"Remove Child "+request.params.id})
};

const updateChild = (request, response, next) => {
  childSchema
    .updateOne(
      { _id: request.params.id },
      {
        $set: {
          name: request.body.name,
          class: request.body.class,
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
        throw new Error("This child id does not exist."); // If you couldnt find the record
      }
    })
    .catch((error) => next(error));

  //respsone.status(200).json({message:"update Child"})
};

module.exports = {
  getAll,
  createChild,
  getOne,
  deleteChild,
  updateChild,
};
