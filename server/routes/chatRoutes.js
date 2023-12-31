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
router.patch("/rename_group", chatController.renameGroup);
router.patch("/add_user", chatController.addUserToGroup);
router.patch("/remove_user", chatController.removeUserFromGroup);

module.exports = router;
