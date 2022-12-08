const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//? register a new user
const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await UserModel.findOne(
            { email: data.email },
            { _id: 0, email: 1 }
        );

        if (!userExist) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userData = {
                ...data,
                password: hashedPassword
            }
            await UserModel.create(userData);
            const user = await UserModel.findOne(
                { email: data.email },
                { password: 0 }
            );

            res.status(200).json({
                success: true,
                message: "User registration successfull.",
                data: user
            })

        } else {
            res.status(500).json({
                success: false,
                message: "User already exist!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User registration failed!",
            error: error
        })
    }
}

//? login a user
const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const existUser = await UserModel.findOne(
            { email: data.email },
            { email: 1, password: 1 }
        );

        if (existUser) {
            const matchPassword = await bcrypt.compare(data.password, existUser.password);

            if (matchPassword) {
                const user = await UserModel.findOne(
                    { email: data.email },
                    { password: 0, createdDate: 0 }
                );
                const token = jwt.sign(
                    { email: user.email },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(200).json({
                    success: true,
                    message: "Login successfull.",
                    token: token,
                    data: user
                })

            } else {
                res.status(500).json({
                    success: false,
                    message: "Incorrect password!"
                })
            }

        } else {
            res.status(500).json({
                success: false,
                message: "User not found!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to login!",
            error: error
        })
    }

}

module.exports = {
    registerUser,
    loginUser
}