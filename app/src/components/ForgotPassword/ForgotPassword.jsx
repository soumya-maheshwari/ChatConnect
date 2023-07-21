import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotImg from "../../assets/forgot.svg";
import "./forgotPassword.css";
import mail from "../../assets/mail.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validMail, setValidMail] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    toast.success("An otp is sent to your email address ", {
      position: "top-right",
      // theme: "DARK",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      navigate("/otp");
    }, 6000);
  };
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if (regexEmail.test(email)) {
      document.getElementById("wrong-email").style.display = "none";
      setValidMail(true);
    } else if (email) {
      document.getElementById("wrong-email").style.display = "block";
      setValidMail(false);
    }
  }, [email]);

  return (
    <>
      <div className="container">
        <div className="left">
          <img src={forgotImg} alt="forgot" className="forgot-img" />
        </div>
        <div className="forms">
          <h1 className="forgot-head">Forgot your password?</h1>
          <h2>Don't worry.</h2>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <img src={mail} alt="mail" className="mail" />
            <input
              type="text"
              value={email}
              className="input-field"
              id="email"
              name="email"
              required
              onChange={handleEmail}
            />

            <p id="wrong-email">Invalid Email Address</p>
          </div>
          <Button
            className="send"
            variant="contained
          "
            onClick={handleSubmit}
          >
            SEND
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
