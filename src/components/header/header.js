import React, { useState, useEffect } from "react";
import "./header.css";

const Header = (props) => {
  return (
    <>
      <div className="NavBar">
        <h3>NIFTI</h3>
        <button onClick={props.func.connect}>
          {" "}
          {props.func.address === 0
            ? "Connect"
            : `${props.func.address.slice(0, 8)}....`}{" "}
        </button>
      </div>
    </>
  );
};

export default Header;
