const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });

            return next();
        } catch (err) {
            const errors = err.inner.map((errorItem) => ({
                path: errorItem.path,
                errors: errorItem.errors,
            }));

            return next(
                new ApiError(
                    httpStatus.UNPROCESSABLE_ENTITY,
                    httpStatus["422_NAME"],
                    errors
                )
            );
        }
    };
};

module.exports = validateSchema;
