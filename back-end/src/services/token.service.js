const jsonwebtoken = require("jsonwebtoken");
const httpStatus = require("http-status");
const dayjs = require("dayjs");

const BlacklistToken = require("../models/blacklistToken.model");
const config = require("../config");
const { TOKEN_TYPES } = require("../constants");
const ApiError = require("../utils/ApiError");

const generateToken = (
    claims,
    { type = TOKEN_TYPES.ACCESS, ttl = config.jwt.ttl } = {}
) =>
    jsonwebtoken.sign({ ...claims, type }, config.jwt.secret, {
        expiresIn: ttl,
    });

const decodeToken = (token) => jsonwebtoken.verify(token, config.jwt.secret);

const deactivateToken = async (token) => {
    const { exp, id, type } = decodeToken(token);

    if (type === TOKEN_TYPES.ACCESS) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Can't invalidate access token."
        );
    }

    await BlacklistToken.create({
        token,
        userId: id,
        expiredAt: dayjs(exp * 1000).toISOString(),
    });
};

const tokenService = { generateToken, decodeToken, deactivateToken };

module.exports = tokenService;
