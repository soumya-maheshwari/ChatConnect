import React, { useDebugValue } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./userList.css";

const UserList = (props) => {
  const dispatch = useDispatch();
  const sm = useSelector((state) => state.auth);

  const handleAccessChat = () => {};
  return (
    <div>
      <Box
        display={"flex"}
        bgcolor={"grey"}
        // onclick={handleFunction}
      >
        <div className="boxs">
          <p className="name">{props.name}</p>
          <p className="user-name" onClick={handleAccessChat}>
            {props.username}
          </p>
          <hr className="line" />
        </div>
      </Box>
    </div>
  );
};

export default UserList;
