const mongoose=require("mongoose");

//1-Generating The Schema 
const schema= new mongoose.Schema({
    _id:Number,
    name:String, // {type:String, required:true, uniqure:true,}
    capacity:Number
})

//2-Mapping
mongoose.model("Class",schema);