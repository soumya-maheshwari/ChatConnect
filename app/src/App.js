import { useEffect } from "react";
import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Logout from "./components/Logout/Logout";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (user) {
  //     navigate("/chat_page");
  //   }
  // }, [navigate]);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/chat_page" exact element={<ChatPage />} />
            <Route path="/logout" exact element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
