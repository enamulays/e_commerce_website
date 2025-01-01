import React from "react";

function Loader() {
  return (
    <div className="h-screen w-screen bg-gray-600 flex justify-center items-center">
      <div className="h-[70px] w-[70px]  rounded-full border-[6px] border-white/50 translate-y-[-100px]">
        <div className="h-full w-full border-2 border-transparent">
          <div className="w-full h-full border-[6px] border-y-transparent border-x-yellow-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
