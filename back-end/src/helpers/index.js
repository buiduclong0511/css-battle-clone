const getNameFromEmail = (email) => email.replace(/@.+$/, "");

const capitalizeString = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

module.exports = { getNameFromEmail, capitalizeString };
