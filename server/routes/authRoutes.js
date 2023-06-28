const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const authVerify = require("../middleware/authVerify");

router.get("/home", authController.home);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
module.exports = router;
