"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { twMerge } from "tailwind-merge";
import { Product } from "@/type_local";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/reducers/cartReducer";
import toast from "react-hot-toast";

function AddToCartButton({
  className,
  product,
}: {
  className?: string;
  product?: Product;
}) {
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItems
  );
  const dispatch = useDispatch();

  console.log(cartItems);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(product?.title.substring(0, 8) + "...added to cart")
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
