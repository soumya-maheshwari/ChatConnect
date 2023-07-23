import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Logout from "./components/Logout/Logout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Otp from "./components/Otp/Otp";
import Error from "./components/Error/Error";
import ResetPassword from "./components/resetPassword/ResetPassword";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  const user = false;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ChatConnect" exact element={<Login />} />
          <Route path="/" exact element={<Login />} />

          {/* <redirect from="/" to="/ChatConnect" /> */}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/chat_page" exact element={<ChatPage />} />
          <Route path="/logout" exact element={<Logout />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/otp" exact element={<Otp />} />
          <Route path="/error404" exact element={<Error />} />
          <Route path="/resetPassword" exact element={<ResetPassword />} />
          <Route path="/editProfile" exact element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
