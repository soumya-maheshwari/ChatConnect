import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserToGroupThunk, renameGroupThunk } from "../Redux/chatSlice";
import { searchUser } from "../Redux/searchSlice";
import UserBadge from "./ChatPage/GroupChatModal/UserBadge";
import UserListItem from "./ChatPage/GroupChatModal/UserListItem";
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const sm = useSelector((state) => state.search);
  const [chats, setChats] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const chatss = JSON.parse(localStorage.getItem("chatInfo"));
  // console.log(chatss._id);
  const chatid = chatss._id;
  const userData = {
    chatName: groupChatName,
    chatId: chatid,
  };

  const userData2 = {
    chatid: chatid,
    userId: selectedUsers._id,
  };
  console.log(userData2);
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

  const handleSearchUser = async (query) => {
    setSearch(query);
    console.log(search);
    if (!query) {
      return;
    } else {
      try {
        setLoading(true);
        dispatch(searchUser(search))
          .then((res) => {
            // console.log(res);
            return res;
          })
          .catch((err) => {
            // console.log(err);
            return err.response;
          });
      } catch (error) {
        console.log(error);
        return error.response;
      }
    }
  };
  useEffect(() => {
    setChats(sm.chatArray);
  }, [sm.chatArray]);

  useEffect(() => {
    if (sm.isSuccess) {
      // if (sm.userList.length > 0) {
      setLoading(false);
      // console.log(sm.userList.length);
      setSearchResult(sm.userList);
      // console.log(searchResultArray);
      // }
    } else {
      setSearchResult([]);
    }
  }, [sm.isSuccess, sm.userList]);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added in the group", {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleAddUser = () => {
    // alert("j");
    dispatch(addUserToGroupThunk(userData2));
  };
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
              <FormControl>
                <Input
                  placeholder="Add Users"
                  onChange={(e) => {
                    handleSearchUser(e.target.value);
                  }}
                />
              </FormControl>
              {selectedUsers.map((a) => {
                console.log(a);
                return (
                  <div className="badge" onClick={handleAddUser}>
                    <UserBadge
                      key={a._id}
                      user={a}
                      name={a.name}
                      // onClick={handleAddUser}
                    />
                  </div>
                );
              })}

              {/* /// */}
              {loading
                ? null
                : searchResult?.slice(0, 4).map((userr) => {
                    return (
                      <UserListItem
                        name={userr.name}
                        username={userr.username}
                        key={userr._id}
                        profile_id={userr._id}
                        handleFunction={() => handleGroup(userr)}
                      />
                    );
                  })}
            </Box>
          </Modal>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};

export default UpdatedGroupChatModal;
