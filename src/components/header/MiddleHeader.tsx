import React from "react";
import Container from "../Container";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import HeaderIcons from "./HeaderIcons";
import MobileNavigation from "./MobileNavigation";
import { User } from "@/type_local";
import DropdownMenuDemo from "./DropdownMenuDemo";
import { RiNextjsFill } from "react-icons/ri";

function MiddleHeader({
  user,
  handleLogout,
}: {
  user: User;
  handleLogout: () => void;
}) {
  return (
    <div className="border-b-[1px] border-b-gray-400 bg-white relative z-30">
      <Container className="py-5 flex items-center gap-4 md:gap-6 lg:gap-20 justify-between">
        <Link href={"/"}>
          <RiNextjsFill size={30} />
        </Link>
        <SearchInput />
        <div className="inline-flex items-center gap-3">
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

          <HeaderIcons user={user} />
          <div className="flex items-center gap-4 md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MiddleHeader;
