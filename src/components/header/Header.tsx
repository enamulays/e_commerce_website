"use client";

import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import MiddleHeader from "./MiddleHeader";
import BottomHeader from "./BottomHeader";
import { userApi, useUserLogoutMutation, useUserQuery } from "@/api/userApi";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: userData } = useUserQuery({});
  const [userLogout] = useUserLogoutMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/seller");

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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div
      className={`sticky top-0 bg-white z-10 ${
        hideHeader ? "hidden" : "block"
      }`}
    >
      <TopHeader />
      <MiddleHeader user={userData?.user} handleLogout={handleLogout} />
      <BottomHeader />
    </div>
  );
}

export default Header;
