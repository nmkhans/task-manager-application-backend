const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!"
            })
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded) {
            req.decoded = decoded;
            next();
        }

    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Forbidden access!"
        })
    }
}

module.exports = verifyUser;