import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ModalFooter } from "react-bootstrap";
import { createGroupChat } from "../../../Redux/chatSlice";
import { searchUser } from "../../../Redux/searchSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "../Sidebar/UserList/UserList";
import UserListItem from "./UserListItem/UserListItem";
import UserBadge from "./UserBadge/UserBadge";
// import { ModalFooter } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

const GroupChatModal = () => {
  const dispatch = useDispatch();

  const n = useSelector((state) => state.chat);

  console.log(n);

  const sm = useSelector((state) => state.search);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState("");
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [a, setA] = useState("");

  const handleChatName = (e) => {
    setGroupChatName(e.target.value);
  };

  // const handleA = (e) => {
  //   setA(e.target.value);
  // };

  const userData = {
    name: groupChatName,
    users_name: JSON.stringify(selectedUsers.map((u) => u._id)),
  };

  const handleSubmit = () => {
    if (!groupChatName) {
      toast.error("Please select all the fields", {
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
    dispatch(createGroupChat(userData))
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  };

  useEffect(() => {
    if (n.isSuccess) {
      // toast.success(`${n.response}`, {
      //   position: "top-right",
      //   // theme: "DARK",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
    }
  }, [n]);

  console.log(selectedUsers);

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
        // toast.error("Please enter something to search", {
        //   position: "top-right",
        //   // theme: "DARK",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        console.log(error);
        return error.response;
      }
    }
  };

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

  useEffect(() => {
    if (sm.isSuccess) {
      if (sm.userList.length > 0) {
        setLoading(false);
        // console.log(sm.userList.length);
        setSearchResult(sm.userList);
        // console.log(searchResultArray);
      }
    } else {
      setSearchResult([]);
    }
  }, [sm.isSuccess, sm.userList]);

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
              CREATE GROUP CHAT
            </Typography>

            <div>
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  onChange={handleChatName}
                  value={groupChatName}
                />
              </FormControl>
              <Button
                variant="contained"
                // onClick={handleSubmit}
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
              return <UserBadge key={a._id} user={a} />;
            })}
            {/* CHATS */}
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
            {/* <ModalFooter> */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ padding: "10px", marginTop: "10px" }}
            >
              CREATE
            </Button>
            {/* </ModalFooter> */}
          </Box>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default GroupChatModal;
