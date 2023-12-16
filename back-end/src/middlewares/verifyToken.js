const httpStatus = require("http-status");

const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");

const verifyToken = ({ required = true } = {}) => {
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

            const { id } = tokenService.decodeToken(token);

            user = await userService.findById(id);
        } catch (err) {}

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
