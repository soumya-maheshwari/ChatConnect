import React from "react";
import { Box, Skeleton } from "@mui/material";
const ChatLoading = () => {
  return (
    <div>
      <Box sx={{ width: 300 }}>
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
        <Skeleton animation="wave" height={"150px"} />
      </Box>
    </div>
  );
};

export default ChatLoading;
