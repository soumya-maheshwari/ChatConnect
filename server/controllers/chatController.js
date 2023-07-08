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
  try {
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
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createGroupChat = async (req, res, next) => {
  try {
    const { users_name, name } = req.body;
    console.log(users_name, "users_name");
    console.log(name, "name");
    if (!users_name || !name) {
      next(new ErrorHandler(400, "Please enter all the fields"));
    }

    var users = JSON.parse(req.body.users_name);
    console.log(users, "users");
    const userid = req.user._id;
    console.log(userid, "userid");
    if (users < 2) {
      next(
        new ErrorHandler(400, "More than 2 users are required to form a group")
      );
    }
    users.push(userid);

    const groupChat = await Chat.create({
      chatName: name,
      users,
      isGroupChat: true,
      groupChatAdmin: userid,
    });

    console.log(groupChat);
    const fullGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      fullGroupChat,
      msg: "Group chat created successfully",
    });
    console.log(fullGroupChat);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const renameGroup = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      next(new ErrorHandler(400, "Chats not found"));
    } else {
      res.status(200).json({
        updatedChat,
        msg: "Group renamed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addUserToGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const addUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!addUser) {
      next(new ErrorHandler(400, "Chat not found"));
    } else {
      res.status(200).json({
        addUser,
        msg: "user added successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeUserFromGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const removeUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removeUser) {
      next(new ErrorHandler(400, "Chat not found"));
    } else {
      res.status(200).json({
        removeUser,
        msg: "User removed from Group successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
};
