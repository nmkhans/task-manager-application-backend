const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser
} = require("../controllers/userController");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    filterTask,
    countTask
} = require("../controllers/taskController");
const uploadImage = require("../controllers/imageController");
const upload = require("../middlewares/imageUpload");
const verifyUser = require("../middlewares/verifyUser");
const { generateOTP, verifyOTP, resetPassword } = require("../controllers/OTPController");

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

//? user image upload api
router.post("/image-upload", upload.single("image"), uploadImage);

//todo: Task Management Api

//? create task api
router.post("/create-task", verifyUser, createTask);

//? get all task api
router.get("/get-tasks", verifyUser, getTasks);

//? update a task api
router.put("/update-task/:id", verifyUser, updateTask);

//? delete a task api
router.delete("/delete-task/:id", verifyUser, deleteTask)

//? filter task api
router.get("/filter-task", verifyUser, filterTask)

//? count task api
router.get("/count-task", verifyUser, countTask)

//todo: OTP code api

//? generate otp code api
router.post("/generate-otp", generateOTP);

//? verify otp code api
router.post("/verify-otp", verifyOTP);

//? reset password api
router.put("/reset-password", resetPassword)

//todo: Dashboard management

//? get all users api
router.get("/get-users", getUsers);

//? delete a user
router.delete("/delete-user/:id", deleteUser)

module.exports = router;