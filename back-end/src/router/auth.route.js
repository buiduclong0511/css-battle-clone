const express = require("express");

const authController = require("../controllers/auth.controller");
const validateSchema = require("../middlewares/validateSchema");
const authSchemas = require("../validations/auth.validation");

const authRouter = express.Router();

authRouter.post(
    "/sign-in",
    validateSchema(authSchemas.signInSchema),
    authController.signInWithEmail
);
authRouter.post(
    "/confirm-sign-in",
    validateSchema(authSchemas.confirmSignInSchema),
    authController.confirmSignInWithEmail
);

module.exports = authRouter;
