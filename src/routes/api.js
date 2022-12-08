const { Router } = require("express");
const defaultController = require("../controllers/defaultController");

const router = Router();

//? handle default request
router.get("/", defaultController);

module.exports = router;