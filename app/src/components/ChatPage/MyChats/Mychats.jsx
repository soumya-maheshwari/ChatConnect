import React, { useState } from "react";
import { Box } from "@mui/material";
import GroupChatModal from "../GroupChatModal/GroupChatModal";
import { Button } from "react-bootstrap";

const Mychats = () => {
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  return (
    <>
      <div className="my-chats">
        <Box
          flexDirection={"column"}
          alignItems={"center"}
          p={3}
          bgcolor={"gold"}
          borderRadius={"2px"}
        >
          <Box
            pb={3}
            px={3}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontFamily={"sans-serif"}
          >
            MY CHATS
            <GroupChatModal>
              <Button display={"flex"}>+</Button>
            </GroupChatModal>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Mychats;
