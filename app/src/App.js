import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let isUerLoggedIn = localStorage.getItem("access token") ? true : false;
  isUerLoggedIn = false;
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/chat_page" exact element={<ChatPage />} />

            {/* 
            {isUerLoggedIn ? (
              <Route path="/chat_page" exact element={<ChatPage />} />
            ) : (
              <Route path="/error" exact element={<ErrorPage />} />
            )} */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
