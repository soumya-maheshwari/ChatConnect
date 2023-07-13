import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserList = (props) => {
  const sm = useSelector((state) => state.auth);

  return (
    <div>
      <Box display={"flex"} bgcolor={"red"}>
        <p>{props.name}</p>
        <p>{props.username}</p>
        <p>{props.email}</p>
      </Box>
    </div>
  );
};

export default UserList;
