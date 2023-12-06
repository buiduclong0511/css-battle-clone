const User = require("../models/user.model");

const createUser = async (data) => await User.create(data);

const findByEmail = async (email) => await User.findOne({ where: { email } });

const findById = async (id) => await User.findOne({ where: { id } });

const userService = {
    createUser,
    findByEmail,
    findById,
};

module.exports = userService;
