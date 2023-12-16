const express = require("express");

const taskController = require("../controllers/task.controller");
const verifyToken = require("../middlewares/verifyToken");

const taskRouter = express.Router();

taskRouter.get("/", taskController.index);
taskRouter.get("/:id", verifyToken({ required: false }), taskController.show);

module.exports = taskRouter;
