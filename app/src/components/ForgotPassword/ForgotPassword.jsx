import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotImg from "../../assets/forgot.svg";
import "./forgotPassword.css";
import mail from "../../assets/mail.svg";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../../Redux/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validMail, setValidMail] = useState(false);

  const sm = useSelector((state) => state.auth);
  // console.log(sm);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk({ email }))
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  };

  useEffect(() => {
    if (sm.isSuccess) {
      toast.success(`An otp is sent to your Email ${email}`, {
        position: "top-right",
        // theme: "DARK",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/otp");
      }, 4000);
      localStorage.setItem("forgotEmail", JSON.stringify(email));
    }
  }, [sm]);
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if (regexEmail.test(email)) {
      document.getElementById("wrong-email-forgot").style.display = "none";
      setValidMail(true);
    } else if (email) {
      document.getElementById("wrong-email-forgot").style.display = "block";
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
          <form onSubmit={handleSubmit} className="form-class">
            <h1 className="forgot-head">Forgot your password?</h1>
            <h2 className="body-text">Don't worry.</h2>
            <div className="form-groupp">
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

              <p id="wrong-email-forgot">Invalid Email Address</p>
            </div>
            <button
              type="submit"
              className="forgot-btn"
              onSubmit={handleSubmit}
            >
              SEND
            </button>{" "}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
