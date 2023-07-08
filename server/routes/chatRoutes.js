const express = require("express");
const router = express.Router();
const { chatController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create_chat", authVerifyToken, chatController.createChat);
router.get("/fetch_chat", authVerifyToken, chatController.fetchChats);
router.post(
  "/create_GroupChat",
  authVerifyToken,
  chatController.createGroupChat
);

module.exports = router;
