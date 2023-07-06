const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");

router.get("/home", authController.home);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/all_users", authController.getAllUsers);
module.exports = router;
