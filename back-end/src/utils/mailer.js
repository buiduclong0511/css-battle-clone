const nodeMailer = require("nodemailer");

const config = require("../config");

const mailer = nodeMailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: config.mail.username,
        pass: config.mail.password,
    },
});

module.exports = mailer;
