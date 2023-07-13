import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "react-bootstrap";
import search_icon from "../../../assets/search.svg";
import "./sidebar.css";
import { Input, Menu, MenuItem } from "@mui/material";
import bell from "../../../assets/bell.svg";
import { IoIosArrowDropdown } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import ProfileModal from "../profileModal/ProfileModal";
import { useNavigate } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "../../../components/ChatPage/Sidebar/UserList/UserList";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../../Redux/searchSlice";

const Sidebar = () => {
  // let isUerLoggedIn = localStorage.getItem("access token") ? true : false;

  // const userInfo = JSON.parse(localStorage.getItem("user token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sm = useSelector((state) => state.search);
  console.log(sm);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState("");
  const [searchResultArray, setSearchResultArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("access token");
    // e.preventDefault();

    console.log("logout succcessful");
    return navigate("/");
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("access token");

    setUser(userInfo);
    // console.log(user);

    if (!userInfo) {
      // navigate("/");
    }
  }, [user]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // console.group(search);
  };

  const userData = {
    search,
  };
  const handleUserSearch = () => {
    dispatch(searchUser(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  useEffect(() => {
    if (sm.isSuccess) {
      if (sm.userList.length > 0) {
        console.log(sm.userList.length);
        setSearchResultArray(sm.userList);
        console.log(searchResultArray);
      }
    } else {
      setSearchResultArray([]);
    }
  }, [sm]);

  return (
    <>
      <div className="sidebar">
        <Tooltip
          title="search users to chat"
          placement="bottom-end"
          // onOpen={handleClick}
          // onClose={handleClose}
        >
          <Button className="btn">
            <img src={search_icon} alt="search" className="search" />
            Search user
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
            <RxAvatar />
            <IoIosArrowDropdown />
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        {/* <div className="side-drawer"></div> */}
      </div>
      <SwipeableDrawer placement="left" anchor="left" open="false">
        <Box display={"flex"} pb={2}>
          <Input
            placeholder="search y name or email"
            maxRows={2}
            value={search}
            onChange={handleSearch}
          ></Input>
          <Button onClick={handleUserSearch}>GO</Button>
        </Box>
        {searchResultArray.length > 0
          ? searchResultArray.map((userr) => {
              return (
                <UserList
                  name={userr.name}
                  username={userr.username}
                  email={userr.email}
                />
              );
            })
          : ""}
      </SwipeableDrawer>
      <ToastContainer />
    </>
  );
};

export default Sidebar;
