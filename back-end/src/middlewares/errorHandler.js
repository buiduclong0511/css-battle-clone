function errorHandler(error, req, res, _next) {
    return res.status(error.statusCode).json({
        error: error.message,
        detail: error.detail,
    });
}

module.exports = errorHandler;
