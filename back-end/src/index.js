const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const httpStatus = require("http-status");

const config = require("./config");
const initRouter = require("./router");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");
const sequelize = require("./models");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());

// Static file
app.use(express.static("src/public"));

// Router
initRouter(app);

// Catch exception
app.use((req, res, next) => {
    next(new ApiError(httpStatus.METHOD_NOT_ALLOWED, httpStatus["405_NAME"]));
});
app.use(errorHandler);

// App listen
sequelize
    .authenticate()
    .then(() => {
        app.listen(config.app.port, () => {
            console.log("App listening on port", config.app.port);
        });
    })
    .catch((err) => {
        console.error("Database connection failed.", err);
    });
