const httpStatus = require("http-status");
const dayjs = require("dayjs");

const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const { TOKEN_TYPES } = require("../constants");
const BlacklistToken = require("../models/blacklistToken.model");

const verifyToken = ({ required = true, type = TOKEN_TYPES.ACCESS } = {}) => {
    let user = null;
    return async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                throw new ApiError(
                    httpStatus.UNAUTHORIZED,
                    httpStatus["401_NAME"]
                );
            }

            const token = bearerToken.replace("Bearer ", "");
            const isBlacklisted = !!(await BlacklistToken.findOne({
                where: { token },
            }));

            if (isBlacklisted) {
                throw new ApiError(
                    httpStatus.UNAUTHORIZED,
                    httpStatus["401_NAME"]
                );
            }

            const { id, type: tokenType } = tokenService.decodeToken(token);

            if (tokenType === type) {
                user = await userService.findById(id);
            }
        } catch (err) {
            user = null;
        }

        req.user = user;

        if (required && !user) {
            return next(
                new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"])
            );
        }

        return next();
    };
};

module.exports = verifyToken;
