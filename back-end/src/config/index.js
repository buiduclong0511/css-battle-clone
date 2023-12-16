const env = require("../utils/env");

const config = {
    app: {
        host: env.string("HOST", "http://localhost"),
        port: env.number("PORT", 8080),
    },
    clientOrigin: env.string("CLIENT_ORIGIN", "http://localhost:5173"),
    mail: {
        username: env.string("MAIL_USERNAME"),
        password: env.string("MAIL_PASSWORD"),
    },
    auth: {
        emailTokenTTL: env.number("EMAIL_TOKEN_TTL", 60 * 60), // default: 1 hour
    },
    jwt: {
        ttl: env.number("JWT_TTL", 60 * 5), // default: 5 minutes
        refreshTtl: env.number("JWT_REFRESH_TTL", 60 * 60 * 24 * 7), // default: 7 days
        secret: env.string("JWT_SECRET"),
    },
    database: {
        host: env.string("DB_HOST", "127.0.0.1"),
        port: env.string("DB_PORT", 3306),
        username: env.string("DB_USERNAME", "root"),
        password: env.string("DB_PASSWORD", "root@123"),
        database: env.string("DB_DATABASE_NAME", "css_battle_clone"),
        dialect: env.string("DB_DIALECT", "127.0.0.1"),
    },
    gamePlay: {
        passPercent: env.number("GAME_PASS_PERCENT", 90),
    },
};

module.exports = config;
