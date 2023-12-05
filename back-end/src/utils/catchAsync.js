const httpStatus = require("http-status");

const ApiError = require("./ApiError");

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!(err instanceof ApiError)) {
            next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
        }
        return next(err);
    });
};

module.exports = catchAsync;
