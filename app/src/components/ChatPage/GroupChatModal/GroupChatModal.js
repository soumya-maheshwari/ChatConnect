import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ModalFooter } from "react-bootstrap";
import { createGroupChat } from "../../../Redux/chatSlice";

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
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChatName = (e) => {
    setChatName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createGroupChat());
  };

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
