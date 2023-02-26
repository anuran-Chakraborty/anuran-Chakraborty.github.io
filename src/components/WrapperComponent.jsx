import React from "react";
import Navbar from "./Navbar";

const WrapperComponent = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Navbar />
      </div>
      <div className="pt-8 flex-1 bg-gradient-to-br from-violet-100 to-indigo-400">
        {children}
      </div>
    </div>
  );
};

export default WrapperComponent;
