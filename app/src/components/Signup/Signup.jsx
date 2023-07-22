import React, { useState, useEffect } from "react";
import mail from "../../assets/mail.svg";
import lock from "../../assets/lock.svg";
import user from "../../assets/user.svg";
import namee from "../../assets/name.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import signUp from "../../assets/signUp.svg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show2, setShow2] = useState(false);
  const [validMail, setValidMail] = useState(false);

  const sm = useSelector((state) => state.auth);
  // console.log(sm);

  // useEffect(() => {
  //   if (!sm.isLoading) {
  //     setShowToast(true);
  //   }
  // }, [sm]);

  const userData = {
    name,
    username,
    email,
    password,
  };
  console.log(userData);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleShowHide = () => {
    setShow(!show);
  };

  const handleShowHide2 = () => {
    setShow2(!show2);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if (regexEmail.test(email)) {
      document.getElementById("wrong-email2").style.display = "none";
      setValidMail(true);
    } else if (email) {
      document.getElementById("wrong-email2").style.display = "block";
      setValidMail(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(true);

    if (validMail) {
      dispatch(registerUser(userData))
        .then((res) => {
          // console.log(res);
          return res;
        })
        .catch((err) => {
          // console.log(err);
          return err.response;
        });
    }
  };

  useEffect(() => {
    if (sm.isSuccess) {
      toast.success(`${sm.response}`, {
        position: "top-right",
        // theme: "dark",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(userData));

      setTimeout(() => {
        navigate("/chat_page");
      }, 6000);
    } else {
      if (showToast) {
        toast.error(`${sm.response}`, {
          position: "top-right",
          // theme: "dark",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, [showToast, sm]);

  return (
    <>
      <div className="container-signup">
        <div className="left">
          <img src={signUp} alt="login" className="login-img" />
        </div>
        <div className="forms2">
          <h1 className="heading-signup">SIGNUP</h1>

          <form onSubmit={handleSubmit} className="form-class2">
            <div
              className="form-group2
            "
            >
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <img src={namee} alt="name" className="mail" />
              <input
                type="text"
                className="input-field"
                id="name"
                name="name"
                value={name}
                required
                onChange={handleName}
              />
            </div>
            <div
              className="form-group2
            "
            >
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <img src={mail} alt="mail" className="mail" />
              <input
                type="text"
                className="input-field"
                id="email"
                name="email"
                value={email}
                required
                onChange={handleEmail}
              />
            </div>
            <p id="wrong-email2">Invalid Email Address</p>

            <div
              className="form-group2
            "
            >
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <img src={user} alt="user" className="user" />
              <input
                type="text"
                className="input-field"
                id="user"
                name="username"
                required
                value={username}
                onChange={handleUsername}
              />
            </div>
            <div
              className="form-group2
            "
            >
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <img src={lock} alt="lock" className="lock" />

              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={handlePassword}
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
            <div
              className="form-group2
            "
            >
              <label htmlFor="password" className="form-label">
                Confirm Password
              </label>

              <img src={lock} alt="lock" className="lock" />

              <input
                type={show2 ? "text" : "password"}
                id="password"
                name="password"
                required
                className="input-field"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              {show2 ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeimg"
                  onClick={handleShowHide2}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleShowHide2}
                  className="eyeimg"
                />
              )}
            </div>
            <button type="submit" className="login-btn">
              SignUp
            </button>
            <p className="texttt">
              Already have an account?
              <span className="link">
                <Link to="/ChatConnect">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
