require("dotenv").config();

const env = {
    string(key, defaultValue) {
        return String(process.env[key] ?? defaultValue);
    },
    number(key, defaultValue) {
        return Number(process.env[key] ?? defaultValue);
    },
};

module.exports = env;
