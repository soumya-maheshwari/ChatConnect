import React, { useState, useEffect } from "react";
import "./login.css";
import mail from "../../assets/mail.svg";
import lock from "../../assets/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootstrap from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/authSlice";
import loginImg from "../../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(true);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [bool, setBool] = useState(false);
  const [loading, setLoading] = useState(true);

  const sm = useSelector((state) => state.auth);
  console.log(sm);

  useEffect(() => {
    if (sm.response == "") {
      setBool(true);
      setShowToast(false);
    }
  }, [sm]);

  const userData = {
    email,
    password,
  };
  // console.log(userData);

  const handleShowHide = () => {
    setShow(!show);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setShowToast(true);
    dispatch(loginUser(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  useEffect(() => {
    if (sm.isSuccess) {
      toast.success(`${sm.response}`, {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/chat_page");
      }, 6000);

      localStorage.setItem("userInfo", JSON.stringify(sm.profile));
    } else {
      // if (showToast) {
      if (sm.response !== "") {
        toast.error(`${sm.response}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // }
      }
    }
  }, [sm]);

  return (
    <>
      <div className="container-login">
        <div className="left">
          <img src={loginImg} alt="login" className="login-img" />
        </div>
        <div className="forms-login">
          <h1 className="heading-login">LOGIN</h1>
          <form onSubmit={handleSubmit} className="form-class">
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
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <img src={lock} alt="lock" className="lock" />

              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
                required
                className="input-field"
              />
              {show ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeimg"
                  onClick={handleShowHide}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleShowHide}
                  className="eyeimg"
                />
              )}
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>{" "}
            <p className="textt">
              Don't have an account?
              <span className="link">
                <Link to="/signup">SIGNUP</Link>
              </span>
            </p>
            <p className="textt">
              Forgot Password?
              <span className="linkk">
                <Link to="/forgotPassword">Follow these steps.</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
