const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const {
    registerUser,
    loginUser
} = require("../controllers/userController");

//? define router
const router = Router();

/* Application Routes */

//? default api
router.get("/", defaultController);

//? user registration api
router.post("/register-user", registerUser);

//? user login api
router.post("/login-user", loginUser);

module.exports = router;