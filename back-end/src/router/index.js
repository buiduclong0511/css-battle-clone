const authRouter = require("./auth.route");
const previewRouter = require("./preview.route");
const taskRouter = require("./task.route");
const userSolutionRouter = require("./userSolution.route");

const initRouter = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/tasks", taskRouter);
    app.use("/api/user-solutions", userSolutionRouter);
    app.use("/", previewRouter);
};

module.exports = initRouter;
