import React from "react";
import "./logout.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoutImg from "../../assets/logout.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.clear();
    toast.success("Logout successful", {
      position: "top-right",
      // theme: "DARK",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  const cancelLogout = () => {
    return navigate("/chat_page");
  };
  return (
    <>
      <div className="container">
        <div className="left">
          <img src={logoutImg} alt="Logout" className="logout-img" />
        </div>
        <div className="forms">
          <h1 className="logout-head">Are you sure you want to Logout?</h1>
          <Button
            className="yes"
            variant="contained"
            style={{
              backgroundColor: "blue",
            }}
            onClick={handleLogout}
          >
            YES
          </Button>
          <Button variant="outlined" className="no" onClick={cancelLogout}>
            NO
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Logout;
