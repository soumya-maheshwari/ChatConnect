import { Chip } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const UserBadge = (props) => {
  const { handleFunction } = props;
  return (
    <div>
      {/* {console.log(a)} */}

      <Chip label={props.name} color="primary">
        <div className="badge" fontSize={"12px"} onClick={handleFunction}>
          {/* {props.user.name} */}
          {/* <RxCross2 fontSize={"100px"} /> */}
        </div>
      </Chip>
    </div>
  );
};

export default UserBadge;
