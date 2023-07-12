import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const UserList = () => {
  const sm = useSelector((state) => state.auth);

  return (
    <div>
      <Box display={"flex"} bgcolor={"red"}>
        <p>{sm.user.name}</p>
        <p>{sm.user.email}</p>
      </Box>
    </div>
  );
};

export default UserList;
