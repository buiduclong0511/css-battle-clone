const authRouter = require("./auth.route");
const taskRouter = require("./task.route");

const initRouter = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/tasks", taskRouter);
};

module.exports = initRouter;
