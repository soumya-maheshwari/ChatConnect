import React, { useState, useEffect } from "react";
import "./login.css";
import mail from "../../assets/mail.svg";
import lock from "../../assets/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validMail, setValidMail] = useState(false);

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

  return (
    <>
      <div className="container">
        <h2>Login Form</h2>
        <form>
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
    </>
  );
};

export default Login;
