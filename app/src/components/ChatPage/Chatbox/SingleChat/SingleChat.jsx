import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import arrow from "../../../../assets/backArrow.svg";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../../../Redux/messageSlice";
import ScrollableChatFeed from "../../../ScrollableChatFeed";
import { fetchAllMessagesForAChatThunk } from "../../../../Redux/mesaageFetchSlice";
import Lottie from "lottie-react";
import "./singleChat.css";
import typingAnimation from "../../../../Animations/typing.json";
import { getFullSenderDetails, getSenderUser } from "../../../../config/Helper";
// import io from "socket.io-client";
import UpdatedGroupChatModal from "../../../UpdatedGroupChatModal";
import OthersProfile from "../../../OthersProfile";
import sendImg from "../../../../assets/send.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const END_POINT = "http://localhost:5000";

// var socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  // setSelectedChat,
  // bool,
}) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // console.log(user);
  // console.log(user.id);
  const chatss = JSON.parse(localStorage.getItem("chatInfo"));
  // console.log(chatss);
  const chatid = chatss ? chatss._id : null;
  var chatName;
  const dispatch = useDispatch();

  const sm = useSelector((state) => state.message);
  const msg = useSelector((state) => state.messageFetch);
  // console.log(msg);
  // console.log(msg.messagesArray);
  const [loading, setLoading] = useState(true);

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [typing, setTyping] = useState(true);
  const [istyping, setIsTyping] = useState(false);
  // const [socketConnection, setSocketConnection] = useState(false);
  // console.log(sm);

  const userData = {
    content: messageToSend,
    chatId: chatss,
  };

  useEffect(() => {
    if (sm.isSuccess) {
      toast.success("Message sent", {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [sm]);

  useEffect(() => {
    if (msg.isSuccess) {
      setAllMessages(msg.messagesArray);
      // setMessageToSend("");
      // socket.emit("join a chat", chatid);

      // setLoading(false);
    }
  }, [msg]);

  useEffect(() => {
    if (msg.isSuccess) {
      setLoading(false);
    }
  });

  const sendMessage = (e) => {
    if (e.key === "Enter" && messageToSend) {
      dispatch(sendMessageThunk(userData))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
      // alert("senttt");
    }
  };

  const handleMessageSend = (e) => {
    setMessageToSend(e.target.value);
    // if (!typing) {
    setIsTyping(true);
    // }
    setLoading(false);
    let lastTypingTime = new Date().getTime();
    // console.log(lastTypingTime);
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    setAllMessages(msg.messagesArray);
    // setLoading(false);
  }, [sm]);
  // useEffect(() => {
  //   socket = io(END_POINT);
  //   socket.emit("setup", user);
  //   // console.log(user);
  //   socket.on("connection", () => setSocketConnection(true));
  // }, []);

  useEffect(() => {});

  // console.log(allMessages, "all messages");

  const func = () => {
    dispatch(fetchAllMessagesForAChatThunk(chatid))
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  };
  // useEffect(() => {
  //   dispatch(fetchAllMessagesForAChatThunk(chatid))
  //     .then((res) => {
  //       // console.log(res);
  //       return res;
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       return err.response;
  //     });
  //   // / / socket.emit("join a chat", chatid);
  // }, [dispatch]);

  useEffect(() => {
    func();
    // console.log(chatid, "chatid");
    // socket.emit("join a chat", chatid);
  });

  return (
    <>
      {chatss ? (
        <>
          <p
            style={{
              fontSize: "28px", // On base (0 to 600px)
              fontSize: "30px", // On medium (960px to 1280px)
              // paddingBottom: "3px",
              paddingLeft: "2px",
              paddingRight: "2px",
              width: "100%",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "space-between", // On base (0 to 600px)
              alignItems: "center",
            }}
          >
            {" "}
            {allMessages && !chatss.isGroupChat ? (
              <>
                {getSenderUser(user, chatss.users)}
                <OthersProfile
                  user={getFullSenderDetails(user, chatss.users)}
                />
              </>
            ) : (
              <>
                <div className="chat-name-head">
                  {`${chatss.chatName.toUpperCase()}`}
                  <UpdatedGroupChatModal
                    // fetcMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </div>
              </>
            )}
          </p>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            // padding={3}
            padding={2}
            bgcolor="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflow="hidden"
          >
            {console.log(loading)}
            {loading ? (
              "loading.."
            ) : (
              <div className="messages">
                <ScrollableChatFeed allMessages={allMessages} />
              </div>
            )}
            <TextField
              onKeyDown={sendMessage}
              id="first-name"
              required
              fullWidth
              margin="normal"
              label="Enter a messsage"
              variant="outlined"
              value={messageToSend}
              onChange={handleMessageSend}
              InputProps={{
                sx: { bgcolor: "#E0E0E0" },
                // placeholder: "Enter a message...",
              }}
            />
            {/* {istyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  // height={50}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            // )} */}
            {/* <Button onClick={sendMessage}>
              <img src={sendImg} alt="" className="send-btn" />
            </Button> */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h6" paragraph fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
