import React, { useState, useEffect } from "react";
import "./logout.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoutImg from "../../assets/logout.svg";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("userInfo");

    return navigate("/");
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
          <Button variant="contained" className="yes" onClick={handleLogout}>
            YES
          </Button>
          <Button variant="outlined" className="no" onClick={cancelLogout}>
            NO
          </Button>
        </div>
      </div>
    </>
  );
};

export default Logout;
