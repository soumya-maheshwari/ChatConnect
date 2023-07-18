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
  const chatss = localStorage.getItem("chatInfo");
  console.log(chatss);
  // console.log(selectedChat);

  const dispatch = useDispatch();

  const sm = useSelector((state) => state.message);

  const [loading, setLoading] = useState();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState();
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  console.log(sm);

  const userData = {
    content: messageToSend,
    chatId: chatss,
  };

  console.log(userData, "user data");
  useEffect(() => {
    setLoading(sm.isLoading);
  }, [sm]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && messageToSend) {
      // localStorage.setItem("messageInfo", JSON.stringify(userData));

      dispatch(sendMessageThunk(userData))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          alert("failed to send the message");
          return err.response;
        });
    }
  };

  const handleMessageSend = (e) => {
    setMessageToSend(e.target.value);
  };

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
    </div>
  );
};

export default SingleChat;
