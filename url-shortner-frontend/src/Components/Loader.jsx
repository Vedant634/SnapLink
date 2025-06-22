import React from "react";
import { DotLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <DotLoader
        size={75}
        speedMultiplier={0.8}
        color="#4c1d95" 
        loading={true}
      />
    </div>
  );
};

export default Loader;
