import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Tooltip } from "@mui/material";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/Helper";

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = "#";

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }
// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
//   };
// }

const ScrollableChatFeed = ({ allMessages }) => {
  // console.log(allMessages, "scrollable");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  return (
    <div>
      <ScrollableFeed>
        {allMessages &&
          allMessages.map((m, i) => {
            return (
              <div key={m._id} style={{ display: "flex" }}>
                {(isSameSender(allMessages, m, i, user.id) ||
                  isLastMessage(allMessages, i, user.id)) && (
                  <Tooltip title={m.sender.name} placement="bottom-start">
                    <Avatar
                      sx={{
                        mt: "7px",
                        mr: 1,
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                      }}
                      alt={m.sender.name}
                      // sx={{ bgcolor: deepOrange[500] }}
                    ></Avatar>
                  </Tooltip>
                )}
                <span
                  style={{
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: `${
                      m.sender._id === user.id ? "#e1a0eb" : "#B9F5D0"
                    }`,

                    marginLeft: isSameSenderMargin(allMessages, m, i, user.id),
                    marginTop: isSameUser(allMessages, m, i, user.id) ? 3 : 10,
                  }}
                >
                  {m.content}
                </span>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChatFeed;
