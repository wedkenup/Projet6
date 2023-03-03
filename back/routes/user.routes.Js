const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const limiter = require("../middleware/ratelimit");
const GuardPasswordValidator = require("../middleware/passwordvalidator");

/* Routes connexion utilisateurs */
router.post("/signup", GuardPasswordValidator, userController.signup);
router.post("/login", limiter, userController.login);


module.exports = router;