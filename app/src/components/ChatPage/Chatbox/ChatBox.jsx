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
        p={10}
        marginLeft={"30px"}
        // width={"1000px"}
        width={"200%"}
        height={"80%"}
        color={"black"}
        bgcolor={"pink"}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
};

export default ChatBox;
