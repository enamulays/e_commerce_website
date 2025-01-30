import React from "react";
import Container from "../Container";
import Image from "next/image";
import { logo } from "@/assets";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import HeaderIcons from "./HeaderIcons";
import MobileNavigation from "./MobileNavigation";
import { User } from "@/type_local";
import DropdownMenuDemo from "./DropdownMenuDemo";

function MiddleHeader({
  user,
  handleLogout,
}: {
  user: User;
  handleLogout: () => void;
}) {
  return (
    <div className="border-b-[1px] border-b-gray-400 ">
      <Container className="py-5 flex items-center gap-4 md:gap-6 lg:gap-20 justify-between">
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="w-28 " />
        </Link>
        <SearchInput />
        <div className="hidden md:inline-flex items-center gap-3">
          {user ? (
            <DropdownMenuDemo user={user} handleLogout={handleLogout} />
          ) : (
            <Link href={"/login"} className="flex items-center gap-2 text-sm">
              <div className="border-gray-700 border-2 rounded-full p-1.5 ">
                <CiUser />
              </div>
              <div>
                <p className="text-xs">Hellow, Guests</p>
                <p>Login/ Register</p>
              </div>
            </Link>
          )}

          <HeaderIcons />
        </div>
        <MobileNavigation />
      </Container>
    </div>
  );
}

export default MiddleHeader;
