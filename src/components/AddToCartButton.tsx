"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { twMerge } from "tailwind-merge";
import { Product } from "@/type_local";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "@/api/cartApi";

function AddToCartButton({
  className,
  product,
}: {
  className?: string;
  product?: Product;
}) {
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      console.log(product);
      const response = await addToCart(product).unwrap();
      console.log(response);
      if (product) {
        toast.success(product?.title.substring(0, 8) + "...added to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomButton
      className={twMerge(
        "border-themeColor hover:bg-themeColor/90 rounded-full w-full py-2",
        className
      )}
      onClick={handleAddToCart}
    >
      Add to cart
    </CustomButton>
  );
}

export default AddToCartButton;
