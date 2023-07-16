import { Chip } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const UserBadge = (a, { handleFunction }) => {
  return (
    <div>
      {/* {console.log(a)} */}
      <Chip label={a.name} color="primary">
        <div className="badge">
          {/* {props.user.name} */}
          <RxCross2 fontSize={"100px"} />
        </div>
      </Chip>
    </div>
  );
};

export default UserBadge;
