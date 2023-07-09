import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/chat_page" exact element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
