const User = require("../models/user.model");

const create = async (data) => await User.create(data);

const findByEmail = async (email) => await User.findOne({ where: { email } });

const findById = async (id) => await User.findOne({ where: { id } });

const updateById = async (id, data) =>
    await User.update(data, { where: { id } });

const userService = {
    create,
    findByEmail,
    findById,
    updateById,
};

module.exports = userService;
