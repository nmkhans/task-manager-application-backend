const { Router } = require("express");
const defaultController = require("../controllers/defaultController");
const {
    registerUser,
    loginUser
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
router.post("/create-task", createTask);

//? get all task api
router.get("/get-tasks", verifyUser, getTasks);

//? update a task api
router.put("/update-task/:id", updateTask);

//? delete a task api
router.delete("/delete-task/:id", deleteTask)

//? filter task api
router.get("/filter-task", filterTask)

//? count task api
router.get("/count-task", countTask)

module.exports = router;