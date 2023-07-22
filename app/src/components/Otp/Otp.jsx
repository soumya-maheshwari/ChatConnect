import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpImg from "../../assets/otp.svg";
import key from "../../assets/key.svg";
import "./otp.css";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTPThunk } from "../../Redux/authSlice";

const Otp = () => {
  const emailInfo = JSON.parse(localStorage.getItem("forgotEmail"));
  // console.log(emailInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setotp] = useState("");
  const [validOtp, setValidOtp] = useState(false);

  const rightOtp = /^[0-9]*$/;
  const sm = useSelector((state) => state.auth);
  // console.log(sm);

  const handleOtp = (e) => {
    setotp(e.target.value);
  };

  const userData = {
    email: emailInfo,
    otp: otp,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTPThunk(userData))
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
    if (rightOtp.test(otp)) {
      document.getElementById("otp-error").style.display = "none";
      setValidOtp(true);
    } else if (otp) {
      document.getElementById("otp-error").style.display = "block";
      setValidOtp(false);
    }
  }, [otp]);

  useEffect(() => {
    if (sm.isSuccess) {
      toast.success(`OTP verified`, {
        position: "top-right",
        // theme: "DARK",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // setTimeout(() => {
      //   navigate("/");
      // }, 4000);
    }
  }, [sm]);
  return (
    <>
      <div className="container">
        <div className="left">
          <img src={otpImg} alt="forgot" className="otp-img" />
        </div>
        <div className="forms">
          <h1 className="otp-head">OTP Verification</h1>
          <p>An OTP has been sent to your email</p>
          <form onSubmit={handleSubmit} className="form-class">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                OTP
              </label>
              <img src={key} alt="mail" className="mail" />
              <input
                type="text"
                value={otp}
                className="input-field"
                id="email"
                name="email"
                required
                onChange={handleOtp}
              />

              <p id="otp-error">Enter numbers only.</p>
            </div>
            <button type="submit" className="otp-btn">
              VERIFY{" "}
            </button>{" "}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Otp;
