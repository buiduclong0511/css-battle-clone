const authRouter = require("./auth.route");

const initRouter = (app) => {
    app.use("/api/auth", authRouter);
};

module.exports = initRouter;
