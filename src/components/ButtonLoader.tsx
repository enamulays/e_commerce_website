import React from "react";
import { twMerge } from "tailwind-merge";

function ButtonLoader() {
  return (
    <div className="flex justify-center items-center">
      <div className={twMerge("h-[20px] w-[20px]  rounded-full border-[4px] border-white/50 border-t-yellow-500 animate-spin")}>
      </div>
    </div>
  );
}
export default ButtonLoader;
