const jsonwebtoken = require("jsonwebtoken");

const config = require("../config");

const generateToken = (claims) =>
    jsonwebtoken.sign(claims, config.jwt.secret, {
        expiresIn: config.jwt.ttl,
    });

const decodeToken = (token) => jsonwebtoken.verify(token, config.jwt.secret);

const tokenService = { generateToken, decodeToken };

module.exports = tokenService;
