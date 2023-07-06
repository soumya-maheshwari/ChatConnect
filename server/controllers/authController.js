const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const { User } = require("../models");
const User = require("../models/userModel");
const { ErrorHandler } = require("../middleware/ErrorHandler");
const { validatepassword, validatemail } = require("../utils/validations");

const home = (req, res, next) => {
  const data = {
    msg: "welcome",
  };
  try {
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "1d" });
};

const refreshToken = (req, res, next) => {
  try {
    const rf_token = req.body.refreshtoken;

    if (!rf_token)
      return next(new ErrorHandler(400, "Please Login or Register"));

    jwt.verify(rf_token, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) return next(new ErrorHandler(401, "Invalid Authentication"));
      const accessToken = createAccessToken({
        id: user._id,
      });
      return res.status(200).json({ accessToken });
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
const login = async (req, res, next) => {
  try {
    //    Destructuring email and password from body
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!(email && password)) {
      return next(new ErrorHandler(400, "email and password is required"));
    }
    // check for user in database
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return next(new ErrorHandler(404, "user not found"));
    }

    const result = await bcrypt.compare(
      password,
      user.password
      // function (err, res) {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(result);
      // }
    );
    // console.log("result", result);
    console.log(password);
    console.log(user.password);
    if (!result) return next(new ErrorHandler(400, "Invalid Credentials"));

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME !! login successful`,
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    // "$2b$12$Km3GYx3QaWkPNsvUWobDDe7xvqANJALDvLycBiNARrgkGpVfOUmGy"
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    // let user = req.user;
    // if (user.verify == true) {
    //   return next(new ErrorHandler(400, "user by this email already exists"));
    // }
    const isUserExists = await User.findOne({ email: email.toLowerCase() });

    if (isUserExists) {
      return next(new ErrorHandler(400, "user by this email already exists"));
    }
    if (!(name && username && email && password)) {
      return next(new ErrorHandler(400, "All the input fields are required."));
    }
    if (!validatepassword(password)) {
      return next(
        new ErrorHandler(400, "incorrect password format is provided")
      );
    }
    if (!validatemail(email)) {
      return next(new ErrorHandler(400, "incorrect email format is provided"));
    }
    const isUserNameExists = await User.findOne({
      username: username.toLowerCase(),
    });

    if (isUserNameExists) {
      return next(new ErrorHandler(400, "this username already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      // hashPassword,
      password: hashPassword,
      // password,
      username,
    });

    const savedUser = await user.save();
    console.log(savedUser);
    if (user.verify == true) {
      return next(new ErrorHandler(400, "user by this email already exists"));
    }

    const accessToken = createAccessToken({ id: user._id });

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${name}  !! signup successful`,
      user,
      accessToken,
      // refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const { search } = req.query;
  const user = await User.find({
    username: { $regex: search, $options: "i" },
  }).select("id email username");

  res.status(200).json(user);
};

module.exports = {
  home,
  login,
  signup,
  // accessToken,
  getAllUsers,
  refreshToken,
};
