import React, { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import search_icon from "../../../assets/search.svg";
import "./sidebar.css";
import { Input, Menu, MenuItem, Button } from "@mui/material";
import bell from "../../../assets/bell.svg";
import ProfileModal from "../../ProfileModal";
import { Link, useNavigate } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "../../../components/ChatPage/Sidebar/UserList/UserList";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../../Redux/searchSlice";
import ChatLoading from "../MyChats/ChatLoading/ChatLoading";
import avatarImg from "../../../assets/avatar.svg";

const Sidebar = () => {
  // const userInfo = JSON.parse(localStorage.getItem("user token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sm = useSelector((state) => state.search);
  // console.log(sm);

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState("");
  const [searchResultArray, setSearchResultArray] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState();
  const open = Boolean(anchorEl);
  const [selectedChat, setSelectedChat] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    setUser(userInfo);
    // console.log(user);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // const userData = {
  //   search: search,
  // };

  const handleUserSearch = () => {
    if (!search) {
      toast.error("Please enter something to search", {
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
    dispatch(searchUser(search))
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
    if (sm.isSuccess) {
      if (sm.userList.length > 0) {
        // console.log(sm.userList.length);
        setSearchResultArray(sm.userList);
        // console.log(searchResultArray);
      }
    } else {
      setSearchResultArray([]);
      // toast.error("Failed to load the chats", {
      //   position: "top-right",
      //   // theme: "DARK",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
    }
  }, [sm.isSuccess, sm.userList]);

  return (
    <>
      <div className="sidebar">
        <Tooltip
          arrow={true}
          title="search users to chat"
          placement="bottom-end"

          // onOpen={handleClick}
          // onClose={handleClose}
        >
          <Button
            className="btun"
            color="secondary"
            // variant="contained"
            onClick={handleDrawerToggle}
          >
            <img src={search_icon} alt="search" className="search" />
            <p className="searchText"> Search user</p>
          </Button>
        </Tooltip>
        <div className="title">Chat App</div>
        <div className="menu">
          <img src={bell} className="bell" alt="" />
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img src={avatarImg} alt="avatar" className="avatar-class" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ProfileModal>
              <MenuItem onClick={handleClose}>PROFILE</MenuItem>
            </ProfileModal>
            <MenuItem>
              <span className="logout-link">
                <Link to="/logout">LOGOUT</Link>
              </span>
            </MenuItem>
          </Menu>
        </div>

        {/* <div className="side-drawer"></div> */}
      </div>
      <SwipeableDrawer
        placement="left"
        anchor="left"
        // open="true"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box display={"flex"} pb={2}>
          <Input
            placeholder="search a name"
            maxRows={2}
            className="input-field"
            value={search}
            onChange={handleSearch}
          ></Input>
          <Button variant="outlined" onClick={handleUserSearch}>
            GO
          </Button>
        </Box>

        {sm.isLoading ? (
          <ChatLoading />
        ) : (
          searchResultArray.map((userr) => {
            return (
              <UserList
                name={userr.name}
                username={userr.username}
                key={userr._id}
                profile_id={userr._id}
              />
            );
          })
        )}
      </SwipeableDrawer>
      <ToastContainer />
    </>
  );
};

export default Sidebar;
