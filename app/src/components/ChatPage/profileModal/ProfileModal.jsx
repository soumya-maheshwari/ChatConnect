import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loggedInuser, setLoggedInUser] = useState();
  let isUerLoggedIn = localStorage.getItem("access token");
  // console.log(isUerLoggedIn);
  const config = {
    headers: {
      Authorization: `Bearer ${isUerLoggedIn}`,
    },
  };
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>PROFILE</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginTop: "200px" }}
            >
              {/* {isUerLoggedIn ? "shdj" : "wdlj"}
               */}

              {/* {sm.isError}
               */}
              <div>Name :{sm.user.name}</div>

              <div>UserName :{sm.user.username}</div>
              <div>Email :{sm.user.email}</div>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ProfileModal;
