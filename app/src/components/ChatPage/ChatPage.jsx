import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Mychats from "./MyChats/Mychats";
import "./chatPage.css";
import ChatBox from "./Chatbox/ChatBox";
import { Box, Grid } from "@mui/material";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <div className="chat-page">
        {user && <Sidebar />}
        <Box className="chat-container" sx={{ margin: 0 }}>
          {user && <Mychats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>
  );
};

export default ChatPage;
