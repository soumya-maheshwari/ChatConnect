import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./userList.css";
import { accessChatThunk } from "../../../../Redux/chatSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// function random_rgba() {
//   var o = Math.round,
//     r = Math.random,
//     s = 255;
//   return (
//     "rgba(" +
//     o(r() * s) +
//     "," +
//     o(r() * s) +
//     "," +
//     o(r() * s) +
//     "," +
//     r().toFixed(1) +
//     ")"
//   );
// }

const UserList = (props) => {
  const dispatch = useDispatch();

  const sm = useSelector((state) => state.chat);
  // console.log(sm);
  const handleAccessChat = () => {
    const userId = props.profile_id;
    dispatch(accessChatThunk({ userId }))
      .then((res) => {
        // console.log(userId);
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  };

  // useEffect(() => {
  //   if (sm.isSuccess) {
  //     toast.success("Chat created successfully", {
  //       position: "top-right",
  //       // theme: "DARK",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } else {
  //     toast.error("An error occured in fetching the chats", {
  //       position: "top-right",
  //       // theme: "DARK",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  // }, [sm.isChatCreated]);

  return (
    <div>
      <Box display={"flex"} bgcolor={"#f7f5f0"}>
        <div className="boxs">
          <p className="name">{props.name}</p>
          <p className="user-name" onClick={handleAccessChat}>
            {props.username}
          </p>
          <hr className="line" />
        </div>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default UserList;
