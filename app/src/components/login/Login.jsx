import React, { useState, useEffect } from "react";
import "./login.css";
import mail from "../../assets/mail.svg";
import lock from "../../assets/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [bool, setBool] = useState(false);
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  useEffect(() => {
    if (sm.message == "") {
      setBool(true);
    }
  }, [sm]);

  const userData = {
    email,
    password,
  };
  console.log(userData);

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

  useEffect(() => {
    if (regexEmail.test(email)) {
      document.getElementById("wrong-email").style.display = "none";
      setValidMail(true);
    } else if (email) {
      document.getElementById("wrong-email").style.display = "block";
      setValidMail(false);
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    if (validMail) {
      dispatch(loginUser(userData))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }
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
    } else {
      if (showToast) {
        toast.error(`${sm.response}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, [sm]);
  return (
    <>
      <div className="container">
        <h2>Login Form</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="email">Email Address</label>
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
          <div className="form-group">
            <label for="password">Password</label>

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
          <button type="submit">Login</button>
        </form>

        <p className="text">
          Don't have an account?
          <span className="link">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
