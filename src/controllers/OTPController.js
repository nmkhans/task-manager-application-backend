const OTPModel = require("../models/OTPModel");
const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//? generate OTP code
const generateOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            //? generate OPT
            const now = new Date();
            now.setTime(now.getTime() + (1000 * 60));
            const otp = Math.round(Math.random() * 1000000);

            //? save otp in database
            const OTPData = {
                OTP: otp,
                email: email,
                status: "new",
            }
            await OTPModel.create(OTPData);

            //? send otp in email
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODE_MAILER_MAIL,
                    pass: process.env.NODE_MAILER_PASS
                }
            })

            const mail = {
                from: "NMK Task Manager <nurmoin05@gmail.com>",
                to: email,
                subject: "Password reset OTP",
                text: `Your OTP password is ${otp}`,
            }

            await transporter.sendMail(mail);

            res.cookie("OTP", otp, { expires: now, httpOnly: true });
            res.cookie("email", email, { expires: now, httpOnly: true });
            return res.status(200).json({
                success: true,
                message: "otp send"
            })

        } else {
            return res.status(500).json({
                success: false,
                message: "No user found!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side error",
            data: error
        })
    }
}

//? verify OTP code
const verifyOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const { otp } = req.body;

        const matchOTP = await OTPModel.findOne({
            email: email,
            OTP: otp
        })

        if (matchOTP) {
            await OTPModel.updateOne(
                { _id: matchOTP._id },
                { $set: { status: "verified" } },
                { upsert: true }
            );

            const now = new Date();
            now.setTime(now.getTime() + (1000 * 60));
            res.cookie("OTP", matchOTP.OTP, { expires: now, httpOnly: true })
            return res.status(200).json({
                success: true,
                message: "OTP Verified."
            })

        } else {
            return res.status(500).json({
                success: false,
                message: "OTP has expired!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side error",
            data: error
        })
    }
}

//? reset password
const resetPassword = async (req, res) => {
    try {
        const { status, email } = req.query;
        const data = req.body;
        
        const otpIsVarified = await OTPModel.findOne({
            status: status,
            OTP: data.otp
        });
        
        if(otpIsVarified) {
            const password = data.password;
            const updatedPassword = await bcrypt.hash(password, 10);
            
            await UserModel.updateOne(
                {email: email},
                {$set: {password: updatedPassword}},
                {upsert: true}
            );

            return res.status(200).json({
                success: true,
                message: "Password reset completed. Login with new password."
            })

        } else {
            return res.status(500).json({
                success: false,
                message: "OTP is invalid!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side error",
            data: error
        })
    }
}

module.exports = {
    generateOTP,
    verifyOTP,
    resetPassword
};