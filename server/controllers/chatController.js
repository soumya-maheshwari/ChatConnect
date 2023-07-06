const { ErrorHandler } = require("../middleware/ErrorHandler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const createChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    // const { user } = req.body;

    const user = req.user;
    const userid = user._id;
    console.log(userId, "userId");
    console.log(req.user, "req.user-2");
    console.log(req.user.id);
    // console.log(req.user._id, "j");
    if (!userId) {
      console.log("UserId param not sent with request");
      return next(new ErrorHandler(400, "user does not exists"));
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userid } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email",
    });
    console.log(isChat, "is-chat");

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      });
      const fullChat = await Chat.findOne({ _id: chatData._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json({
        fullChat,
        msg: "chat created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchChats = async (req, res, next) => {
  const userid = req.user._id;
  const chat = await Chat.find({
    users: {
      $elemMatch: {
        $eq: userid,
      },
    },
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const user = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "username email name _id",
  });

  res.status(200).json({
    user,
    msg: "chat fetched successfully",
    success: true,
  });
};
module.exports = {
  createChat,
  fetchChats,
};
