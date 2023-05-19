const express = require("express");
const classController = require("../controllers/ClassController");
const routeMiddlewares = require("../Middlewares/routeMW")
const router = express.Router();

router.route("/classes")
    .get(classController.getAll)
    .post(routeMiddlewares.checkAdmin, classController.createClass);

router.route("/classes/:id")
    .get(classController.getOne)
    .put(routeMiddlewares.checkAdmin, classController.updateClass)
    .delete(routeMiddlewares.checkAdmin, classController.deleteClass);

module.exports=router;