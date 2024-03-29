const crypto = require("crypto");
const httpStatus = require("http-status");
const { getAuth } = require("firebase-admin/auth");

const firebaseApp = require("../firebase");
const cache = require("../utils/cache");
const catchAsync = require("../utils/catchAsync");
const mailer = require("../utils/mailer");
const ApiError = require("../utils/ApiError");
const config = require("../config");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const { getNameFromEmail } = require("../helpers");
const { AUTH_PROVIDERS, TOKEN_TYPES } = require("../constants");

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
        subject: "[CSS Battle] Sign in request",
        to: email,
        html: `Link: ${config.clientOrigin}/confirm-sign-in?token=${token}&email=${email}`,
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

    cache.del(getTokenKey(email));
    let user = await userService.findByEmail(email);

    if (!user) {
        user = await userService.create({
            displayName: getNameFromEmail(email),
            email,
            provider: AUTH_PROVIDERS.PASSWORD_LESS,
        });
    }

    const accessToken = tokenService.generateToken({ id: user.id });
    const refreshToken = tokenService.generateToken(
        { id: user.id },
        { type: TOKEN_TYPES.REFRESH, ttl: config.jwt.refreshTtl }
    );

    return res.json({
        accessToken,
        refreshToken,
    });
});

const getCurrentUser = catchAsync(async (req, res) => {
    return res.json({
        data: req.user,
    });
});

const signInWithToken = catchAsync(async (req, res) => {
    try {
        const firebaseUser = await getAuth(firebaseApp).verifyIdToken(
            req.body.token
        );

        let user = await userService.findByEmail(firebaseUser.email);

        if (user && user.avatar !== firebaseUser.picture) {
            await userService.updateById(user.id, {
                avatar: firebaseUser.picture,
            });
        }

        if (!user) {
            user = await userService.create({
                displayName: getNameFromEmail(firebaseUser.email),
                email: firebaseUser.email,
                provider: AUTH_PROVIDERS.GOOGLE,
                avatar: firebaseUser.picture,
            });
        }

        const accessToken = tokenService.generateToken({ id: user.id });
        const refreshToken = tokenService.generateToken(
            { id: user.id },
            { type: TOKEN_TYPES.REFRESH, ttl: config.jwt.refreshTtl }
        );

        return res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
    }
});

const refreshToken = catchAsync(async (req, res) => {
    const user = req.user;
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace("Bearer ", "");

    const accessToken = tokenService.generateToken({ id: user.id });
    const refreshToken = tokenService.generateToken(
        { id: user.id },
        { type: TOKEN_TYPES.REFRESH, ttl: config.jwt.refreshTtl }
    );

    await tokenService.deactivateToken(token);

    return res.json({
        accessToken,
        refreshToken,
    });
});

const signOut = catchAsync(async (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace("Bearer ", "");

    await tokenService.deactivateToken(token);

    return res.json({
        data: true,
    });
});

const authController = {
    signInWithEmail,
    confirmSignInWithEmail,
    getCurrentUser,
    signInWithToken,
    refreshToken,
    signOut,
};

module.exports = authController;
