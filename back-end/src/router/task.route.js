const express = require("express");

const taskController = require("../controllers/task.controller");

const taskRouter = express.Router();

taskRouter.get("/", taskController.index);
taskRouter.get("/:id", taskController.show);

module.exports = taskRouter;
