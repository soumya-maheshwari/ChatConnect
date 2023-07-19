import React from "react";
import { Box } from "@mui/material";

import SingleChat from "./SingleChat/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <div bgcolor="pink" color="red">
      <Box
        alignItems={"center"}
        flexDirection={"column"}
        display={"flex"}
        // p={3}
        // width={"1000px"}
        width={"100%"}
        color={"red"}
        bgcolor={"pink"}
      >
        <SingleChat
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          // display={"flex"}
        />
      </Box>
    </div>
  );
};

export default ChatBox;
