const express = require("express");
const cors = require("cors");
const router = require("./src/routes/api");

//? app configuration
const app = express();
app.use(cors());
app.use(express.json());

//? handle routes
app.use("/api/v1", router);

//? handle undefined routes
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route was not found!"
    })
});

module.exports = app;