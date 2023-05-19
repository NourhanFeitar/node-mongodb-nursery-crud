const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./../models/TeacherModel");

const bcrypt = require("bcrypt");
const teacherSchema = mongoose.model("Teacher");

exports.login = async function (request, response, next) {

  let email = request.body.email;
  let password = request.body.password;

  let teacher = await teacherSchema.findOne({ email: email });
  try {
    if (teacher == null) {
      throw new Error("This email doesn't exist, please sign up.");
    }

    // Checking Encrypted Password if true then i will give a role according to email
    bcrypt.compare(password, teacher.password, function (err, result) {
      if (result) {     
        let role = "";
        if (teacher.email == "may@gmail.com") {
          role = "admin";
        } else {
          role = "teacher";
        }
        let payload = {
          id: teacher._id,
          role: role,
          userName: teacher.email,
        };
        const token = jwt.sign(payload, "NurserySystem", { expiresIn: "3h" }); // secret key and token expiration
    
        response.status(200).json({ payload: payload, token });
      
      }else{
        response.status(401).json({message:"Incorrect Password"})
      }
    });
    
  } catch (e) {
    next(e);
  }

};
