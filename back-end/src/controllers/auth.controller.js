const crypto = require("crypto");
const httpStatus = require("http-status");

const cache = require("../utils/cache");
const catchAsync = require("../utils/catchAsync");
const mailer = require("../utils/mailer");
const ApiError = require("../utils/ApiError");
const config = require("../config");

const getTokenKey = (email) => {
    return `${email}-sign-in`;
};

const signInWithEmail = catchAsync(async (req, res) => {
    const { email } = req.body;

    const token = crypto.randomBytes(16).toString("hex");
    const result = cache.set(
        getTokenKey(email),
        token,
        config.auth.emailTokenTTL
    );

    if (!result) {
        throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
    }

    await mailer.sendMail({
        to: email,
        html: `Link: ${config.clientOrigin}/confirm-sign-in?token=${token}`,
    });

    return res.json({
        data: true,
    });
});

const confirmSignInWithEmail = catchAsync(async (req, res) => {
    const { token, email } = req.body;

    const cachedToken = cache.get(getTokenKey(email));

    if (!cachedToken || token !== cachedToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
    }

    return res.json({
        data: true,
    });
});

const authController = {
    signInWithEmail,
    confirmSignInWithEmail,
};

module.exports = authController;
