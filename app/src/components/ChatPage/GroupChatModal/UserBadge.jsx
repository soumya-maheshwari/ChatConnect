import { Chip, Stack } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const UserBadge = (props) => {
  const { handleFunction } = props;

  return (
    <div>
      {/* {console.log(a)} */}

      <Stack direction="row" padding={1}>
        <Chip
          label={props.name}
          // color="success"
          // color="#9443f0"
          style={{
            fontSize: "15px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bolder",
            // backgroundColor: "#f0adef",
            backgroundColor: "#547ce3",
          }}
        >
          <div
            className="badge"
            fontSize={"12px"}
            onClick={handleFunction}
          ></div>
        </Chip>
      </Stack>
    </div>
  );
};

export default UserBadge;
