const puppeteer = require("puppeteer");
const crypto = require("crypto");
const httpStatus = require("http-status");
const path = require("path");
const resemble = require("resemblejs");
const fs = require("fs");

const config = require("../config");
const Task = require("../models/task.model");
const ApiError = require("../utils/ApiError");

const captureSolution = async (imagePath, userSolutionId) => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: {
            width: 400,
            height: 300,
        },
    });
    const page = await browser.newPage();

    await page.goto(
        `${config.app.host}:${config.app.port}/user-solutions/${userSolutionId}/preview`
    );

    await page.screenshot({
        clip: { x: 0, y: 0, width: 400, height: 300 },
        path: imagePath,
    });

    await browser.close();
};

const compareImage = (userSolutionImagePath, targetImagePath) =>
    new Promise((resolve, reject) => {
        resemble(fs.readFileSync(userSolutionImagePath))
            .compareTo(fs.readFileSync(targetImagePath))
            .onComplete((data) => {
                fs.unlink(userSolutionImagePath, () => {});
                resolve(data);
            });
    });

const compare = async (userSolution) => {
    const { taskId, id: userSolutionId } = userSolution;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, httpStatus["404_NAME"]);
    }

    const imagePath = path.resolve(
        __dirname,
        `../assets/preview/${userSolutionId}-${new Date().getTime()}.png`
    );
    await captureSolution(imagePath, userSolutionId);

    const { rawMisMatchPercentage } = await compareImage(
        imagePath,
        path.resolve(__dirname, `../public${task.image}`)
    );

    return 100 - rawMisMatchPercentage;
};

const calculateScores = (percentMatch, charactersCount) => {
    const scores = percentMatch * 10 - charactersCount * 0.01;

    return Math.max(0, scores);
};

const userSolutionService = {
    compare,
    calculateScores,
};

module.exports = userSolutionService;
