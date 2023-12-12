const Task = require("../models/task.model");
const taskService = require("../services/task.service");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
    const { limit = 30, order = [["createdAt", "desc"]] } = req.query;

    const tasks = await Task.findAll({
        order,
        limit: Number(limit),
    });

    return res.json({
        data: tasks,
    });
});

const show = catchAsync(async (req, res) => {
    const { id } = req.params;

    const task = await taskService.findById(id);

    return res.json({
        data: task,
    });
});

const taskController = {
    index,
    show,
};

module.exports = taskController;
