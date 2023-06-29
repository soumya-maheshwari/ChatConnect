const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    readBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
