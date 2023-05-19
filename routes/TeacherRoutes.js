const express = require("express");
const teacherController = require("../controllers/TeacherController");
const routeMiddlewares = require("../Middlewares/routeMW")
const router = express.Router();

router.route("/teachers")
    .get(routeMiddlewares.checkAdmin, teacherController.getAll)
    .post(teacherController.createTeacher);

router.route("/teachers/:id")
    .get(routeMiddlewares.checkSameTeacher, teacherController.getOne)
    .put(routeMiddlewares.checkSameTeacher, teacherController.updateTeacher)
    .delete(routeMiddlewares.checkAdmin, teacherController.deleteTeacher);

module.exports=router;