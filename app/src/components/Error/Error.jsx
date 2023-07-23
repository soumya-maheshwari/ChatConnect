import React from "react";
import errorImg from "../../assets/error.svg";
import "./error.css";

const Error = () => {
  return (
    <div>
      <p className="firstText">ERROR 404</p>

      <img src={errorImg} alt="error 404" className="error-img" />
      <p className="secondText">The page you are looking for is not here</p>
    </div>
  );
};

export default Error;
