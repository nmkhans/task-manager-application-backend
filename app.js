const express = require("express");
require("dotenv").config();
const router = require("./src/routes/api");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

//? app configuration
const app = express();
app.use(cors());
app.use(express.json());

//? database connection
const uri = process.env.DATABASE_URI;
const databaseConfig = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS
};

mongoose.set('strictQuery', true);
mongoose.connect(uri, databaseConfig)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));

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