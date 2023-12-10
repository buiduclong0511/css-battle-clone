const Task = require("../models/task.model");

const findById = async (id) => {
    return Task.findOne({ where: { id } });
};

const taskService = { findById };

module.exports = taskService;
