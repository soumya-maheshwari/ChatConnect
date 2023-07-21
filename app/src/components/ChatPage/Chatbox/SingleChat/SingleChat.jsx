import React, { useEffect, useState } from "react";
import { Box, FormControl, Input, TextField } from "@mui/material";
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
import UpdatedGroupChatModal from "../../UpdatedGroupChatModal/UpdatedGroupChatModal";
import OthersProfile from "../../../OthersProfile";

// const END_POINT = "http://localhost:5000";

var socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  // setSelectedChat,
  // bool,
}) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  console.log(user);
  console.log(user.id);
  const chatss = JSON.parse(localStorage.getItem("chatInfo"));
  console.log(chatss);
  const chatid = chatss ? chatss._id : null;
  var chatName;
  const dispatch = useDispatch();

  const sm = useSelector((state) => state.message);
  const msg = useSelector((state) => state.messageFetch);
  console.log(msg);
  // console.log(msg.messagesArray);
  const [loading, setLoading] = useState(true);

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [typing, setTyping] = useState(true);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  // console.log(sm);

  const userData = {
    content: messageToSend,
    chatId: chatss,
  };

  useEffect(() => {
    if (msg.isSuccess) {
      setAllMessages(msg.messagesArray);
      // setLoading(false);
    }
  }, [msg]);

  // console.log(userData, "user data");
  useEffect(() => {
    // setLoading(sm.isLoading);
  }, [sm]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && messageToSend) {
      // localStorage.setItem("messageInfo", JSON.stringify(userData));

      dispatch(sendMessageThunk(userData))
        .then((res) => {
          // console.log(res);
          return res;
        })
        .catch((err) => {
          // console.log(err);
          // alert("failed to send the message");
          return err.response;
        });
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
    setLoading(false);
  }, [sm]);
  useEffect(() => {
    // socket = io(END_POINT);
    // socket.emit("setup", user);
    // console.log(user);
    // socket.on("connection", () => setSocketConnection(true));
  }, []);

  // useEffect(() => {});
  console.log(allMessages, "all messages");
  useEffect(() => {
    dispatch(fetchAllMessagesForAChatThunk(chatid))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });

    // socket.emit("join a chat", chatid);
  }, [dispatch]);
  return (
    <div>
      {/* {chatss ? (
        <div className="chat-name-head">{`${chatss.chatName}`}</div>
      ) : (
        <div className="user-text">Click on a user to start a text</div>
      )} */}
      {chatss ? (
        <Box
          alignItems={"center"}
          flexDirection={"column"}
          display={"flex"}
          p={3}
          color={"red"}
          // bgcolor={"green"}
          height={"100vh"}
        >
          {allMessages && !chatss.isGroupChat ? (
            <>
              <div className="chat-name-head">
                {getSenderUser(user, chatss.users)}
              </div>
              <OthersProfile user={getFullSenderDetails(user, chatss.users)} />
            </>
          ) : (
            <>
              <div className="chat-name-head">
                {`${chatss.chatName}`}
                <UpdatedGroupChatModal
                  // fetcMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            </>
          )}
          {/* {loading ? (
            "loading...."
          ) : (
            <div className="messages">
              <ScrollableChatFeed allMessages={allMessages} />
            </div>
          )} */}
        </Box>
      ) : null}
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        // bgcolor={"green"}
        height={"100vh"}
      >
        {chatss ? `${chatss.chatName}` : null}
        {loading ? (
          <Spinner /> || "loading.."
        ) : (
          <div className="messages">
            <ScrollableChatFeed allMessages={allMessages} />
          </div>
        )}
      </Box>
      <FormControl onKeyDown={sendMessage}>
        <Input
          isRequired
          fullWidth
          type="text"
          placeholder="enter message"
          // onKeyDown={sendMessage}
          value={messageToSend}
          style={{
            backgroundColor: "#E0E0E0",
          }}
          onChange={handleMessageSend}
        />
        {/* {istyping ? (
          <Lottie
            width={70}
            height={50}
            style={{
              marginBottom: 15,
              marginLeft: 0,
            }}
            animationData={typingAnimation}
            loop={true}
          />
        ) : (
          ""

          // <Lottie
          //   width={70}
          //   height={50}
          //   style={{
          //     marginBottom: 15,
          //     marginLeft: 0,
          //   }}
          //   animationData={typingAnimation}
          //   loop={true}
          // /> */}
        {/* )} */}
      </FormControl>
      <Box d="flex" alignItems="center" justifyContent="center" h="100%">
        {/* <text fontSize="3xl" pb={3} fontFamily="Work sans"> */}
        Click on a user to start chatting
        {/* </text> */}
      </Box>
    </div>
  );
};

export default SingleChat;
