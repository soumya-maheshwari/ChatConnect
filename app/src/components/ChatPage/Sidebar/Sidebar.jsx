import React from "react";
import { Button, Tooltip } from "react-bootstrap";
import search_icon from "../../../assets/search.svg";
import "./sidebar.css";
import { Menu, MenuItem } from "@mui/material";
import bell from "../../../assets/bell.svg";
import { useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import ProfileModal from "../profileModal/ProfileModal";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // let isUerLoggedIn = localStorage.getItem("access token") ? true : false;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const sm = useSelector((state) => state.chat);

  return (
    <>
      <div className="sidebar">
        <Tooltip title="search users to chat" placement="bottom-end">
          <Button className="btn">
            <img src={search_icon} alt="search" className="search" />
            search user
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
      </div>
    </>
  );
};

export default Sidebar;
