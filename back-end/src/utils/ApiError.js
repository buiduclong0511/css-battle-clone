class ApiError extends Error {
    statusCode;
    detail;

    constructor(statusCode, message, detail) {
        super(message);
        this.statusCode = statusCode;
        this.detail = detail;
    }
}

module.exports = ApiError;
