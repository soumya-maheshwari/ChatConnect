import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  let isUerLoggedIn = localStorage.getItem("access token");
  // console.log(isUerLoggedIn);

  const sm = useSelector((state) => state.auth);
  // console.log(sm);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Name : {sm.user.name}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              padding={"12px"}
            >
              Username :{sm.user.username}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              padding={"12px"}
            >
              Email :{sm.user.email}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
