const express = require("express");

const config = require("./config");

const app = express();

app.get("/", (req, res) => {
    return res.json({
        data: true,
    });
});

app.listen(config.app.port, () => {
    console.log("App listening on port", config.app.port);
});
