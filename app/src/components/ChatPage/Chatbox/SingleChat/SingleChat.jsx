import React from "react";
import { Box, TextField } from "@mui/material";
import arrow from "../../../../assets/backArrow.svg";
const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  bool,
}) => {
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
        <img src={arrow} alt="" onClick={() => setSelectedChat("")} />
        {/* </TextField> */}
        {selectedChat ? "chat name " : ""}
      </Box>
    </div>
  );
};

export default SingleChat;
