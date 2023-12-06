const getNameFromEmail = (email) => email.replace(/@.+$/, "");

module.exports = { getNameFromEmail };
