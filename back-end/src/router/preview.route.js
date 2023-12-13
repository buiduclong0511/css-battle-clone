const express = require("express");

const userSolutionController = require("../controllers/userSolution.controller");

const previewRouter = express.Router();

previewRouter.get(
    "/user-solutions/:id/preview",
    userSolutionController.preview
);

module.exports = previewRouter;
