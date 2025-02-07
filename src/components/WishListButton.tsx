"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { twMerge } from "tailwind-merge";
import { Product } from "@/type_local";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useUserQuery } from "@/api/userApi";
import { useWishlistAddDelMutation } from "@/api/productsApi";

function WishListButton({
  className,
  product,
  children,
}: {
  className?: string;
  product?: Product;
  children: React.ReactNode;
}) {
  const { refetch } = useUserQuery({});
  const [wishlistAddDel] = useWishlistAddDelMutation();

  const handleWishList = async () => {
    try {
      const response = await wishlistAddDel(product?._id).unwrap();
      toast.success(response?.message);
      refetch();
    } catch (error) {
      console.error(error);
      const err = error as { data?: { message?: string; isLogin: boolean } };
      toast.error(err?.data?.message);
      if (!err?.data?.isLogin) {
        redirect("/login");
      }
    }
  };

  return (
    <CustomButton
      className={twMerge("px-0 py-1 w-auto hover:text-themeColor", className)}
      onClick={handleWishList}
    >
      {children}
    </CustomButton>
  );
}

export default WishListButton;
