const env = require("../utils/env");

const config = {
    app: {
        port: env.number("PORT"),
    },
    clientOrigin: env.string("CLIENT_ORIGIN"),
    mail: {
        username: env.string("MAIL_USERNAME"),
        password: env.string("MAIL_PASSWORD"),
    },
    auth: {
        emailTokenTTL: env.number("EMAIL_TOKEN_TTL", 3600),
    },
};

module.exports = config;
