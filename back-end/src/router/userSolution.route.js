const express = require("express");

const userSolutionController = require("../controllers/userSolution.controller");
const verifyToken = require("../middlewares/verifyToken");
const validateSchema = require("../middlewares/validateSchema");
const userSolutionSchemas = require("../validations/userSolution");

const userSolutionRouter = express.Router();

userSolutionRouter.post(
    "/",
    verifyToken,
    validateSchema(userSolutionSchemas.createSchema),
    userSolutionController.store
);

module.exports = userSolutionRouter;
