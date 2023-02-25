import React from "react";
import Navbar from "./Navbar";

const WrapperComponent = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-200">
      <Navbar />
      <div className="mt-8 flex-1 relative">{children}</div>
    </div>
  );
};

export default WrapperComponent;
