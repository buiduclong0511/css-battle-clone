const { Op } = require("sequelize");

const Task = require("../models/task.model");
const taskService = require("../services/task.service");
const userSolutionService = require("../services/userSolution.service");
const catchAsync = require("../utils/catchAsync");
const config = require("../config");

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
    const playedUsersCount = await userSolutionService.getPlayedUsersCount(id);
    const passedPlayedUsersCount =
        await userSolutionService.getPlayedUsersCount(id, {
            where: {
                percentMatch: {
                    [Op.gte]: config.gamePlay.passPercent,
                },
            },
        });
    const bestSolution = await userSolutionService.getBestSolution(id);
    const { avgScores, avgCharactersCount } =
        await userSolutionService.getAvgValues(id, {
            cols: ["scores", "charactersCount"],
        });

    task.setDataValue("playedUsersCount", playedUsersCount);
    task.setDataValue(
        "successRate",
        (passedPlayedUsersCount / playedUsersCount) * 100
    );
    task.setDataValue("bestSolution", bestSolution);
    task.setDataValue("avgScores", Number(avgScores));
    task.setDataValue("avgCharactersCount", Number(avgCharactersCount));

    return res.json({
        data: task,
    });
});

const taskController = {
    index,
    show,
};

module.exports = taskController;
