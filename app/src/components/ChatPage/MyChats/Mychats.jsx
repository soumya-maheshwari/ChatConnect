import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import GroupChatModal from "../GroupChatModal/GroupChatModal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { accesAllTheChatsThunk } from "../../../Redux/chatSlice";
import { getSenderUser } from "../../../config/Helper";

const Mychats = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const sm = useSelector((state) => state.chat);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const loggedUser = user.name;
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(accesAllTheChatsThunk());
  }, []);

  useEffect(() => {
    setChats(sm.chatArray);
  }, [sm.chatArray]);

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
                    <Box px={3} py={2} key={chat._id} bgcolor={"pink"}>
                      <p>
                        {!chat.isGroupChat
                          ? getSenderUser(loggedUser, chat.users)
                          : chat.chatName}
                      </p>
                    </Box>
                  );
                })}
              </Stack>
            ) : null}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Mychats;
