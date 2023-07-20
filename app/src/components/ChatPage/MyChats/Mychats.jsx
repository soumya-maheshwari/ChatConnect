import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import GroupChatModal from "../GroupChatModal/GroupChatModal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { accesAllTheChatsThunk } from "../../../Redux/chatSlice";
import { getSenderUser } from "../../../config/Helper";
import SingleChat from "../Chatbox/SingleChat/SingleChat";
import ChatLoading from "./ChatLoading/ChatLoading";
import UpdatedGroupChatModal from "../UpdatedGroupChatModal/UpdatedGroupChatModal";
import "./myChats.css";

const Mychats = ({ fetchAgain }) => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [bool, setBool] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("click on a user to start chatting");
  const sm = useSelector((state) => state.chat);
  const [logggedUser, setLogggedUser] = useState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const loggedUser = user.name;
  // console.log(loggedUser);
  useEffect(() => {
    setLogggedUser(JSON.parse(localStorage.getItem("userInfo")));

    dispatch(accesAllTheChatsThunk())
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
    // setBool(true);
  }, [fetchAgain]);
  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    setChats(sm.chatArray);
  }, [sm.chatArray]);

  useEffect(() => {
    if (selectedChat) {
      setText("");
      localStorage.setItem("chatInfo", JSON.stringify(selectedChat));
    }
  }, [selectedChat]);

  // console.log(selectedChat);
  // localStorage.setItem("chatInfo", selectedChat._id);
  // useEffect(() => {
  //   setLogggedUser(JSON.parse(localStorage.getItem("userInfo")));
  // }, [fetchAgain]);

  // console.log(sm);

  // console.log(chats);

  return (
    <>
      <div className="my-chats">
        <Box
          flexDirection={"column"}
          alignItems={"center"}
          p={3}
          bgcolor={"gold"}
          borderRadius={"2px"}
          width={"100%"}
          display={"flex"}
        >
          <Box
            pb={3}
            px={3}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontFamily={"sans-serif"}
            fontSize={"30px"}
            width={"100%"}
          >
            <h1 className="mychat-head"> MY CHATS</h1>
            <GroupChatModal>
              <Button display={"flex"}>+</Button>
            </GroupChatModal>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            // overflowY={"hidden"}
            bgcolor={"#F8F8F8"}
            padding={3}
            overflow={"hidden"}
          >
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat) => {
                  return (
                    <div className="box">
                      <Box
                        px={3}
                        py={2}
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        cursor={"pointer"}
                        bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                        color={selectedChat === chat ? "white" : "black"}
                      >
                        <p>
                          {!chat.isGroupChat
                            ? getSenderUser(logggedUser, chat.users)
                            : "chat.chatName"}
                        </p>
                      </Box>
                    </div>
                  );
                })}
              </Stack>
            ) : (
              <ChatLoading />
            )}
            {/* <p className="click-text">{text}</p> */}
          </Box>
        </Box>
      </div>

      {/* <p className="click-text">{text}</p> */}
    </>
  );
};

export default Mychats;
