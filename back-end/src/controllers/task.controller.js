const Task = require("../models/task.model");
const taskService = require("../services/task.service");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
    const tasks = await Task.findAll({
        order: [["createdAt", "desc"]],
        limit: 30,
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
