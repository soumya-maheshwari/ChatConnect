import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OthersProfile = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>
          <Avatar
            style={{
              backgroundColor: "black",
              textAlign: "center",
              width: "30px",
              height: "30px",
              margin: "auto",
              // marginBottom: "14px",
            }}
          />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Avatar
              style={{
                backgroundColor: "black",
                textAlign: "center",
                width: "50px",
                height: "50px",
                margin: "auto",
                marginBottom: "14px",
              }}
            />
            <Typography
              id="modal-modal-title"
              variant="h5"
              color={"black"}
              fontWeight={"bolder"}
              textAlign={"center"}
            >
              {user.name}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              padding={"5px"}
              color={"black"}
              textAlign={"center"}
              fontStyle={"italic"}
            >
              {user.username}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              // padding={"12px"}
              fontStyle={"italic"}
              color={"black"}
              textAlign={"center"}
            >
              {user.email}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default OthersProfile;
