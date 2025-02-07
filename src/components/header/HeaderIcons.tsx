import { User } from "@/type_local";
import Link from "next/link";
import React from "react";
import { GrFavorite } from "react-icons/gr";
import { SlBag } from "react-icons/sl";

const HeaderIcons = ({user}:{user: User}) => {

  return (
    <>
      <Link href={"/favorite"} className="text-2xl relative">
        <GrFavorite />
        <span className="absolute -top-1 -right-1 text-[10px] font-medium w-4 h-4 bg-themeColor flex justify-center items-center text-white rounded-full">
          {user?.wishlist.length}
        </span>
      </Link>
      <Link href={"/cart"} className="text-2xl relative">
        <SlBag />
        <span className="absolute -top-1 -right-1 text-[10px] font-medium w-4 h-4 bg-themeColor flex justify-center items-center text-white rounded-full">
          {user?.shoppingCart.length}
        </span>
      </Link>
    </>
  );
};

export default HeaderIcons;
