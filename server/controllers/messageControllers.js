const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const { ErrorHandler } = require("../middleware/ErrorHandler");

const fetchAllMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email username")
      .populate("chat");

    res.json({
      msg: "messages fetching successfull",
      messages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    next(ErrorHandler(400, "Invalid data passed into request"));
  } else {
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      var message = await Message.create(newMessage);
      message = await message.populate("sender", "name email username");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name email username",
      });

      await Chat.findByIdAndUpdate(
        chatId,
        {
          latestMessage: message,
        },
        {
          new: true,
        }
      );
      res.json({
        message,
        success: true,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
module.exports = { fetchAllMessages, sendMessage };
