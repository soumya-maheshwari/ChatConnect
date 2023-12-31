//
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const DBconnect = require("./DBConnection");
const app = express();
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const MessageRoutes = require("./routes/messageRoutes");

const { errorMiddleware } = require("./middleware/ErrorHandler");
const { authVerifyToken } = require("./middleware/authVerifyToken");
app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
const server = app.listen(process.env.PORT);
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

app.use("/api/message", MessageRoutes, errorMiddleware);
app.get("/protect", authVerifyToken, (req, res) => {
  const user = req.user;

  res.json({
    user,
    success: true,
  });
});

// const io = require("socket.io")(server, {
//   pingTimeOut: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");

//   // setup
//   socket.on("setup", (userData) => {
//     socket.join(userData.id);
//     // console.log(userData.id);
//     socket.emit("connected");
//   });

//   // joins a chat
//   socket.on("join a chat", (room) => {
//     socket.join(room);
//     // console.log("user joined room " + room);
//   });

//   socket.on("new message", (newMessageReceived) => {
//     var chat = newMessageReceived.chat;
//     if (!chat.users) {
//       return console.log("chat.users is undefined");
//     }
//     chat.users.forEach((user) => {
//       if (user._id == newMessageReceived.sender._id) {
//         return;
//       }
//       socket.in(user._id).emit("message received");
//     });
//   });
// });
