"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { twMerge } from "tailwind-merge";
import { Product } from "@/type_local";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "@/api/cartApi";
import { useUserQuery } from "@/api/userApi";
import { useRouter } from "next/navigation";

function AddToCartButton({
  className,
  product,
  children,
}: {
  className?: string;
  product?: Product;
  children: React.ReactNode;
}) {
  const { refetch } = useUserQuery({});
  const [addToCart] = useAddToCartMutation();
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(product).unwrap();
      toast.success(response?.message);
      refetch();
    } catch (error) {
      console.error(error);
      const err = error as { data?: { message?: string; isLogin: boolean } };
      toast.error(err?.data?.message);
      if (!err?.data?.isLogin) {
        router.push("/login");
      }
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
      {children}
    </CustomButton>
  );
}

export default AddToCartButton;
