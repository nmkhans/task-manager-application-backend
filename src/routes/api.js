const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const {
    registerUser,
    loginUser
} = require("../controllers/userController");
const {
    createTask,
    getTasks
} = require("../controllers/taskController");

//? define router
const router = Router();

/* Application Routes */

//todo: User Management Api

//? default api
router.get("/", defaultController);

//? user registration api
router.post("/register-user", registerUser);

//? user login api
router.post("/login-user", loginUser);

//todo: Task Management Api

//? create task api
router.post("/create-task", createTask);

//? get all task api
router.get("/get-tasks", getTasks);

module.exports = router;