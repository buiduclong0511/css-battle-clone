const httpStatus = require("http-status");

const catchAsync = require("../utils/catchAsync");
const UserSolution = require("../models/userSolution.model");
const ApiError = require("../utils/ApiError");
const userSolutionService = require("../services/userSolution.service");

const store = catchAsync(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const userSolution = await UserSolution.create({
        taskId: body.taskId,
        userId: user?.id,
        answers: JSON.stringify(body.answers),
        charactersCount: body.charactersCount,
    });

    const percentMatch = await userSolutionService.compare(userSolution);
    const scores = await userSolutionService.calculateScores(
        percentMatch,
        body.charactersCount
    );

    userSolution.set("scores", Number(scores.toFixed(4)));
    userSolution.set("percentMatch", Number(percentMatch.toFixed(2)));
    await userSolution.save();

    if (!user) {
        userSolution.destroy();
    }

    return res.json({
        data: userSolution,
    });
});

const preview = catchAsync(async (req, res) => {
    const { id } = req.params;

    const userSolution = await UserSolution.findOne({ where: { id } });
    if (!userSolution) {
        throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
    }

    const { html, css } = JSON.parse(userSolution.answers);

    return res.send(`
        <style>${css}</style> 
        ${html}
    `);
});

const userSolutionController = {
    store,
    preview,
};

module.exports = userSolutionController;
