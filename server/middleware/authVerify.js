const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { ErrorHandler } = require("./ErrorHandler");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token);

    if (!token) {
      res.status(401).json({
        msg: "PLease login or signup before proceeding",
      });
    }
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, payload) => {
      if (err) {
        return next(new ErrorHandler(401, "Invalid credentials"));
      }
      const { id } = payload;
      const user = await User.findById(id);
      if (!user) next(new ErrorHandler(401, "Invalid Authentication"));

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
