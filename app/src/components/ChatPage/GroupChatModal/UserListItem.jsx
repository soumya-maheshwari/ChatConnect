import React, { useState } from "react";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListItem = (props) => {
  const { handleFunction } = props;

  return (
    <div>
      <Box display={"flex"} bgcolor={"#f7d5f0"}>
        <div className="boxs">
          <p className="name">{props.name}</p>
          <p className="user-name" onClick={handleFunction}>
            {props.username}
          </p>
          <hr className="line" />
        </div>
      </Box>
    </div>
  );
};

export default UserListItem;
