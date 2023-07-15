import React from "react";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat/SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <div>
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        p={3}
        color={"red"}
        // bgcolor={"green"}
      >
        <SingleChat
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          display={"flex"}
        />
      </Box>
    </div>
  );
};

export default ChatBox;
