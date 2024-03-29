const express = require("express");

const authController = require("../controllers/auth.controller");
const validateSchema = require("../middlewares/validateSchema");
const authSchemas = require("../validations/auth.validation");
const verifyToken = require("../middlewares/verifyToken");
const { TOKEN_TYPES } = require("../constants");

const authRouter = express.Router();

authRouter.post(
    "/sign-in-with-email",
    validateSchema(authSchemas.signInSchema),
    authController.signInWithEmail
);
authRouter.post(
    "/sign-in-with-email/confirm",
    validateSchema(authSchemas.confirmSignInSchema),
    authController.confirmSignInWithEmail
);
authRouter.post(
    "/sign-in-with-token",
    validateSchema(authSchemas.signInWithTokenSchema),
    authController.signInWithToken
);
authRouter.post(
    "/refresh-token",
    verifyToken({ type: TOKEN_TYPES.REFRESH }),
    authController.refreshToken
);
authRouter.post(
    "/sign-out",
    verifyToken({ type: TOKEN_TYPES.REFRESH }),
    authController.signOut
);
authRouter.get("/current-user", verifyToken(), authController.getCurrentUser);

module.exports = authRouter;
