const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    OTP: Number,
    email: String,
    status: String,
}, {versionKey: false});

const OTPModel = mongoose.model("otp", Schema);

module.exports = OTPModel;