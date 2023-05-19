const express = require("express");
const ChildController = require("../controllers/ChildController");
const routeMiddlewares = require("../Middlewares/routeMW")

const router = express.Router();

router.route("/children")
    .get(ChildController.getAll)
    .post(routeMiddlewares.checkAdmin, ChildController.createChild);

router.route("/children/:id")
    .get(ChildController.getOne)
    .put(routeMiddlewares.checkAdmin, ChildController.updateChild)
    .delete(routeMiddlewares.checkAdmin, ChildController.deleteChild);

module.exports=router;