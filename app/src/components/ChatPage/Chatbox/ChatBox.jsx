import React from "react";
import { Box } from "@mui/material";

import SingleChat from "./SingleChat/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <Box
      alignItems={"center"}
      flexDirection={"column"}
      display={"flex"}
      padding={3}
      width={"100%"}
      borderRadius={"10px"}
      color={"black"}
      bgcolor={"pink"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
