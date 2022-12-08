const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const { registerUser } = require("../controllers/userController");

//? define router
const router = Router();

/* Application Routes */

//? default api
router.get("/", defaultController);

//? user registration api
router.post("/register-user", registerUser);

module.exports = router;