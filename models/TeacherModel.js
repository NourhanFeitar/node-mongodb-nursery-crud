const { hash } = require("bcrypt");
const mongoose=require("mongoose");

//1-Generating The Schema 
const schema= new mongoose.Schema({
    _id:Number,
    name:String, // {type:String, required:true, uniqure:true,}
    subject:String,
    email:String,
    password:String
})

//2-Mapping
mongoose.model("Teacher",schema);