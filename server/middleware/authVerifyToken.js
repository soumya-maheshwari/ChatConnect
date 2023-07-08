const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { ErrorHandler } = require("./ErrorHandler");
require("dotenv").config();

const authVerifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] ||
      req.query.token ||
      req.headers["accesstoken"];
    // console.log(token);
    if (!token) {
      next(new ErrorHandler(401, "please login or signuppp"));
    } else {
      const verify = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      // console.log(verify, "verify");

      // req.user = verify;
      // const { user } = verify;
      req.user = await User.findById(verify.id).select("-password");
      // console.log(req.user, "req.user");
      next();
    }
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(401, "invalid token"));
  }
};

module.exports = {
  authVerifyToken,
};
