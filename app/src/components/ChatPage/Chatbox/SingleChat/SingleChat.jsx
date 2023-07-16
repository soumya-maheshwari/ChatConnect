import React, { useEffect, useState } from "react";
import { Box, Input, TextField } from "@mui/material";
import arrow from "../../../../assets/backArrow.svg";
import { FormControl, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMessagesForAChatThunk,
  sendMessageThunk,
} from "../../../../Redux/messageSlice";
import EmojiPicker from "emoji-picker-react";

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  bool,
}) => {
  const dispatch = useDispatch();
  const sm = useSelector((state) => state.message);

  const [loading, setLoading] = useState();

  const [messageToSend, setMessageToSend] = useState("");
  const [allMessages, setAllMessages] = useState();
  console.log(sm);

  const userData = {
    content: messageToSend,
    // chatId:
  };
  useEffect(() => {
    setLoading(sm.isLoading);
  }, [sm]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && messageToSend) {
      dispatch(sendMessageThunk())
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

  useEffect(() => {
    dispatch(fetchAllMessagesForAChatThunk());
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
        // height={"100%"}
        height={"100vh"}
      >
        {/* <TextField> */}
        {/* <img src={arrow} alt="" onClick={() => setSelectedChat("")} /> */}
        {/* </TextField> */}
        {selectedChat ? "chat name " : ""}
      </Box>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        bgcolor={"#E8E8E8"}
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="messages">{/* messages */}</div>
        )}
        {/* <FormControl required> */}
        {/* <input
            placeholder="enter a message to send"
            // bgcolor={"E0E0E0"}
            value={messageToSend}
            onChange={handleMessageSend}
          /> */}

        <input
          // type={show ? "text" : "password"}
          id="password"
          name="password"
          bgcolor={"red"}
          // value={password}
          // onChange={handlePassword}
          required
          className="input-field"
        />
        {/* </FormControl> */}
      </Box>
    </div>
  );
};

export default SingleChat;
