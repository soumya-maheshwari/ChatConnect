import React from "react";
import { Box } from "@mui/material";
const ChatBox = () => {
  return (
    <div>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        bgcolor={"green"}
      >
        single chat
      </Box>
    </div>
  );
};

export default ChatBox;
