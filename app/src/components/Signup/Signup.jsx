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
  console.log(sm);

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
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/all_users",
        {
          name,
          email,
          username,
          password,
        },
        config
      );
      console.log(data, "data");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      return error.response;
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
      navigate("/chat_page");
      localStorage.setItem("userInfo", JSON.stringify(userData));
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
    // localStorage.setItem("userInfo", JSON.stringify(data));
  }, [showToast]);
  return (
    <>
      <div className="signup">
        <div className="container">
          {/* <h2>SignUp Form</h2> */}
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="name">Full Name</label>
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
            <div className="form-group">
              <label for="email">Email Address</label>
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

            <div className="form-group">
              <label for="username">User Name</label>
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
            <div className="form-group">
              <label for="password">Password</label>

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
            <div className="form-group">
              <label for="password">Confirm Password</label>

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
            <button type="submit">SignUp</button>
          </form>
          <p className="text">
            Already have an account?
            <span className="link">
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
