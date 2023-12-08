const httpStatus = require("http-status");

const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        const token = bearerToken.replace("Bearer ", "");

        const { id } = tokenService.decodeToken(token);

        const user = await userService.findById(id);

        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_NAME"]);
        }

        req.user = user;

        next();
    } catch (err) {
        return next(
            new ApiError(httpStatus.UNAUTHORIZED, httpStatus["401_CLASS"])
        );
    }
};

module.exports = verifyToken;
