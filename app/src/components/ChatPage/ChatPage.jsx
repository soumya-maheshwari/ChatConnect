import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Mychats from "./MyChats/Mychats";
import "./chatPage.css";
import ChatBox from "./Chatbox/ChatBox";
const ChatPage = () => {
  return (
    <>
      <div className="chat-page">
        <Sidebar />
        <div className="chat-container">
          <Mychats />
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
