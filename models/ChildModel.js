const mongoose = require("mongoose");
const autoIncrementer = require("@typegoose/auto-increment")
//1-Generating The Schema
const schema = new mongoose.Schema({
  _id: Number,
  name: String, // {type:String, required:true, uniqure:true,}
  class: {
    type: Number,
    ref: "Class",
  }, // helps in finding later on
});


schema.plugin(autoIncrementer.AutoIncrementID, {});
mongoose.model("Children", schema);


