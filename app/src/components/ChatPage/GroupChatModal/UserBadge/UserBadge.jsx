import { Chip } from "@mui/material";
import React from "react";

const UserBadge = (props, { handleFunction }) => {
  return (
    <div>
      <Chip label={props.user.name} color="primary">
        <div className="badge" onClick={handleFunction}>
          {/* {props.user.name} */}
        </div>
      </Chip>
    </div>
  );
};

export default UserBadge;
