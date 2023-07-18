const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  }

  // { timestamps: true }
);

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;

module.exports = mongoose.model("User", userSchema);
