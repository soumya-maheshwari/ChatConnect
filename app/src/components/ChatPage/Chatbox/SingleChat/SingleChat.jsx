import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, Input, TextField } from "@mui/material";
import arrow from "../../../../assets/backArrow.svg";
import { FormControl, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMessagesForAChatThunk,
  sendMessageThunk,
} from "../../../../Redux/messageSlice";

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
  console.log(sm.messagesArray);
  const [loading, setLoading] = useState();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [typing, setTyping] = useState(false);
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
  };

  // const userData3 = {
  //   chatid,
  // };
  const handleFetchMessages = () => {
    dispatch(fetchAllMessagesForAChatThunk(chatid))
      .then((res) => {
        console.log(res);
        // setAllMessages(sm.messageArray);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    console.log(allMessages, "all msssgs");
  };

  useEffect(() => {
    setAllMessages(sm.messagesArray);
  }, [sm]);
  // useEffect(() => {
  //   dispatch(fetchAllMessagesForAChatThunk(selectedChat))
  //     .then((res) => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err.response;
  //     });
  // }, [dispatch]);

  return (
    <div>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        // bgcolor={"green"}
        // height={"100%"}
        height={"100vh"}
      >
        {/* {selectedChat ? "chat name " : ""} */}
      </Box>

      {/* <FormControl> */}
      <Input
        isRequired
        type="text"
        placeholder="enter message"
        onKeyDown={sendMessage}
        value={messageToSend}
        onChange={handleMessageSend}
      />
      {/* </FormControl> */}
      <button onClick={handleFetchMessages}>FETCH</button>
    </div>
  );
};

export default SingleChat;
