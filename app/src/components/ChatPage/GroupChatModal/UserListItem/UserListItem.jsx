import React, { useState } from "react";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListItem = (props) => {
  const { handleFunction } = props;
  // const [selectedUsers, setSelectedUsers] = useState([]);

  // const handleGroup = (userToAdd) => {
  //   if (selectedUsers.includes(userToAdd)) {
  //     toast.error("User already added in the group", {
  //       position: "top-right",
  //       // theme: "DARK",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //     return;
  //   } else {
  //     setSelectedUsers([...selectedUsers, userToAdd]);
  // }
  // };

  return (
    <div>
      <Box display={"flex"} bgcolor={"grey"}>
        <div className="boxs">
          <p className="name">{props.name}</p>
          <p className="user-name" onClick={handleFunction}>
            {props.username}
          </p>
          <hr className="line" />
        </div>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default UserListItem;
