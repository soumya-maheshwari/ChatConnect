//
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const DBconnect = require("./DBConnection");
const app = express();
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { errorMiddleware } = require("./middleware/ErrorHandler");

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.listen(process.env.PORT);
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("database connected");
//   } catch (err) {
//     console.log(err);
//   }
// };
DBconnect();
// connectDB();
console.log(`Connected to port ${process.env.PORT}`);

// Global Error Handling
app.use(errorMiddleware);

//Routes

app.use("/api", authRoutes, errorMiddleware);
app.use("/api/chat", chatRoutes, errorMiddleware);
app.get("/protect", authVerifyToken, (req, res) => {
  const user = req.user;

  res.json({
    user,
    success: true,
  });
});
