import React, { useEffect, useState } from "react";
import { Box, FormControl, Input, TextField } from "@mui/material";
import arrow from "../../../../assets/backArrow.svg";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../../../Redux/messageSlice";
import ScrollableChatFeed from "../../../ScrollableChatFeed";
import { fetchAllMessagesForAChatThunk } from "../../../../Redux/mesaageFetchSlice";
import Lottie from "lottie-react";
import typingAnimation from "../../../../Animations/typing.json";
import io from "socket.io-client";

const END_POINT = "http://localhost:5000";

var socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  // setSelectedChat,
  // bool,
}) => {
  const chatss = JSON.parse(localStorage.getItem("chatInfo"));
  // console.log(chatss._id);
  const chatid = chatss ? chatss._id : null;
  const dispatch = useDispatch();

  const sm = useSelector((state) => state.message);
  const msg = useSelector((state) => state.messageFetch);
  // console.log(msg);
  // console.log(msg.messagesArray);
  const [loading, setLoading] = useState();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [typing, setTyping] = useState(true);
  const [istyping, setIsTyping] = useState(false);

  // console.log(sm);

  const userData = {
    content: messageToSend,
    chatId: chatss,
  };

  // console.log(userData, "user data");
  useEffect(() => {
    setLoading(sm.isLoading);
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
    socket = io(END_POINT);
  }, []);

  useEffect(() => {});
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
  }, [dispatch]);

  return (
    <div>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        // bgcolor={"green"}
        height={"100vh"}
      >
        {selectedChat ? "chat name " : ""}
        {loading ? (
          "loading...."
        ) : (
          <div className="messages">
            <ScrollableChatFeed messgaes={allMessages} />
          </div>
        )}
      </Box>
      <FormControl onKeyDown={sendMessage}>
        <Input
          isRequired
          type="text"
          placeholder="enter message"
          // onKeyDown={sendMessage}
          value={messageToSend}
          onChange={handleMessageSend}
        />
        {istyping ? (
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
          // />
        )}
      </FormControl>

      {/* <button onClick={handleFetchMessages}>FETCH</button> */}
    </div>
  );
};

export default SingleChat;
