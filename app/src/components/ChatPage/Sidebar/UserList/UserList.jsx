import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import "./userList.css";
const UserList = (props) => {
  const sm = useSelector((state) => state.auth);

  return (
    <div>
      <Box display={"flex"} bgcolor={"grey"}>
        <div className="boxs">
          <p className="name">{props.name}</p>

          <p className="user-name">{props.username}</p>
          {/* <p className="email">{props.email}</p> */}

          <hr className="line" />
        </div>
      </Box>
    </div>
  );
};

export default UserList;
