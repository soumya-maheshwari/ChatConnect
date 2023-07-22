const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.get("/home", authController.home);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/all_users", authVerifyToken, authController.getAllUsers);
router.post("/forgot", authController.forgotPassword);
router.post("/forgot/verify", authController.OtpVerify);

module.exports = router;
