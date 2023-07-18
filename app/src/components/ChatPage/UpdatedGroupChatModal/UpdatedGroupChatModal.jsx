import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { renameGroupThunk } from "../../../Redux/chatSlice";

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
const UpdatedGroupChatModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState();

  const chatss = JSON.parse(localStorage.getItem("chatInfo"));
  // console.log(chatss._id);
  const chatid = chatss._id;
  const userData = {
    chatName: groupChatName,
    chatId: chatid,
  };
  const handleGroupChatName = (e) => {
    setGroupChatName(e.target.value);
  };

  const handleGroupRename = () => {
    if (!groupChatName) {
      toast.error("Enter New group name", {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    dispatch(renameGroupThunk(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        alert("failed to send the message");
        return err.response;
      });
  };

  // useEffect(() => {
  // if (sm.isSuccess) {
  //   toast.success("Group renamed successfully", {
  //     position: "top-right",
  //     // theme: "DARK",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // }
  // }, [sm]);
  return (
    <div>
      <>
        <div>
          <Button onClick={handleOpen}>UPDATE GROUP CHAT</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {chatss.chatName}
              </Typography>
              <div>
                <FormControl>
                  <Input
                    placeholder="Chat Name"
                    onChange={handleGroupChatName}
                    value={groupChatName}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  onClick={handleGroupRename}
                  style={{ padding: "10px", marginTop: "10px" }}
                >
                  UPDATE
                </Button>
              </div>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
              </Typography>
            </Box>
          </Modal>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};

export default UpdatedGroupChatModal;
