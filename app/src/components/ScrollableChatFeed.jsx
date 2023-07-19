import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Stack } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ScrollableChatFeed = ({ messgaes }) => {
  return (
    <div>
      <ScrollableFeed>
        <div style={{ display: "flex" }}>
          {messgaes &&
            messgaes.map((m, i) => {
              return (
                <div key={m._id} style={{ display: "flex" }}>
                  <div>{m.sender.name}</div>
                </div>
              );
            })}
        </div>
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChatFeed;
