import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { ModalFooter } from "react-bootstrap";

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

const GroupChatModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chatName, setChatName] = useState("");

  const handleChatName = (e) => {
    setChatName(e.target.value);
  };

  const handleSubmit = () => {};
  return (
    <>
      <div className="grp-chat-modal">
        <Button onClick={handleOpen}>CREATE GROUP CHAT</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* Name : {sm.user.name} */}
              CREATE GROUP CHAT
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              padding={"12px"}
            >
              {/* Username :{sm.user.username} */}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              padding={"12px"}
            >
              {/* Email :{sm.user.email} */}
            </Typography>
            <div>
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  onChange={handleChatName}
                  value={chatName}
                />
              </FormControl>
            </div>
            <FormControl>
              <Input placeholder="Add Users" />
            </FormControl>
            <ModalFooter>
              <Button variant="contained" onClick={handleSubmit}>
                CREATE CHAT
              </Button>
            </ModalFooter>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default GroupChatModal;
