const express = require("express");
const router = express.Router();
const { chatController } = require("../controllers");

router.post("/create_chat", chatController.createChat);
router.get("/fetch_chat", chatController.fetchChats);

module.exports = router;
