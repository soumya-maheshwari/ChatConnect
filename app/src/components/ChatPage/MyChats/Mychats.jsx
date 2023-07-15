import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import GroupChatModal from "../GroupChatModal/GroupChatModal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { accesAllTheChatsThunk } from "../../../Redux/chatSlice";
import { getSenderUser } from "../../../config/Helper";
import SingleChat from "../Chatbox/SingleChat/SingleChat";

const Mychats = ({ fetchAgain }) => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [bool, setBool] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("click on a user to start chatting");
  const sm = useSelector((state) => state.chat);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const loggedUser = user.name;
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(accesAllTheChatsThunk());
    setBool(true);
  }, [fetchAgain]);

  useEffect(() => {
    setChats(sm.chatArray);
  }, [sm.chatArray]);

  useEffect(() => {
    if (selectedChat) {
      setText("");
    }
  }, [selectedChat]);

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
            MY CHATS
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
                        // bgcolor={"pink"}
                        onClick={() => setSelectedChat(chat)}
                        cursor={"pointer"}
                        bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                        color={selectedChat === chat ? "white" : "black"}
                      >
                        <p>
                          {!chat.isGroupChat
                            ? getSenderUser(loggedUser, chat.users)
                            : chat.chatName}
                        </p>
                      </Box>
                    </div>
                  );
                })}
              </Stack>
            ) : null}
          </Box>
        </Box>
      </div>
      {text}
      {selectedChat && (
        <SingleChat
          selectedChat={selectedChat}
          bool={bool}
          setSelectedChat={setSelectedChat}
        />
      )}
    </>
  );
};

export default Mychats;
