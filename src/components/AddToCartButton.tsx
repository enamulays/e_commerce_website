import React from "react";
import CustomButton from "./CustomButton";
import { twMerge } from "tailwind-merge";

function AddToCartButton({className}:{className?:string}) {
  return (
    <CustomButton className={twMerge("border-themeColor hover:bg-themeColor/90 rounded-full w-full py-2", className)}>
      Add to cart
    </CustomButton>
  );
}

export default AddToCartButton;
