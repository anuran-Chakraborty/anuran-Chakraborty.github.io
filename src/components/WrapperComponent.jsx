import React from "react";
import Navbar from "./Navbar";

const WrapperComponent = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-8 relative">{children}</div>
    </div>
  );
};

export default WrapperComponent;
