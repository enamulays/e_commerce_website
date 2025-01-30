"use client";

import React from "react";
import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import BottomHeader from "./BottomHeader";
import { userApi, useUserLogoutMutation, useUserQuery } from "@/api/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function Header() {
  const { data: userData, isLoading } = useUserQuery({});
  const [userLogout] = useUserLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await userLogout({}).unwrap();
      toast.success(response.message);
      router.push("/login");
      dispatch(userApi.util.resetApiState());
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="sticky top-0 bg-white z-10">
      <TopHeader />
      <MiddleHeader user={userData?.user} handleLogout={handleLogout} />
      <BottomHeader />
    </div>
  );
}

export default Header;
