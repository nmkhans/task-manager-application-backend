const { Router } = require("express");
const defaultController = require("../controllers/defaultController");

//? define router
const router = Router();

/* Application Routes */

//? default api
router.get("/", defaultController);

module.exports = router;