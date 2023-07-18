import React, { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { useSelector } from "react-redux";

const Spinner = () => {
  // const sm = useSelector((state) => state.message);

  // const [loading, setLoading] = useState(false);
  // console.log(sm);

  // useEffect(() => {
  //   setLoading(sm.isLoading);
  // }, [sm]);

  return (
    <div>
      {/* {loading ? ( */}
      <div className="loading">
        <ReactBootstrap.Spinner animation="border" className="spinner" />
      </div>
      {/* // ) : null} */}
    </div>
  );
};

export default Spinner;
