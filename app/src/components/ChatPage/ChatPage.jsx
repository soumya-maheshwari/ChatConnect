import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Mychats from "./MyChats/Mychats";
import "./chatPage.css";
import ChatBox from "./Chatbox/ChatBox";
const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <div className="chat-page">
        {user && <Sidebar />}
        <div className="chat-container">
          {user && <Mychats />}
          {user && <ChatBox />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
