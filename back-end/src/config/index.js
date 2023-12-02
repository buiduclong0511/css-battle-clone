const env = require("../utils/env");

const config = {
    app: {
        port: env.number("PORT"),
    },
};

module.exports = config;
