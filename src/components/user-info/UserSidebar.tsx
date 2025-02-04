"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { usePathname } from "next/navigation";
import { userSidebarData } from "@/constants/data";
import { FiUserCheck } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

export default function UserSidebar() {
  const [loding, setloading] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setloading(false);
    document.body.style.overflow = sideOpen ? "hidden" : "auto";
  }, [sideOpen]);

  if (loding) {
    return null;
  }

  return (
    <>
      <div
        className={`absolute h-screen w-screen bg- z-20 top-0 left-0 overflow-hidden ${
          sideOpen ? "block bg-black/50 md:hidden" : "hidden"
        }`}
        onClick={() => setSideOpen(false)}
      ></div>
      <button
        onClick={() => setSideOpen(!sideOpen)}
        className={`top-32 left-4 absolute ${sideOpen ? "hidden" : "block"}`}
      >
        <HiBars3BottomRight size={25} />
      </button>
      <div
        className={`absolute md:relative mt-10  z-20 duration-200 ${
          sideOpen ? "translate-x-0 " : " -translate-x-64 md:translate-x-0"
        }`}
      >
        <button
          onClick={() => setSideOpen(false)}
          className="top-2 right-2 absolute z-20 md:hidden"
        >
          <RxCross2 size={22} />
        </button>
        <Card className="h-[70vh] sticky top-40 w-56 ">
          <div className=" py-4">
            <div className="flex flex-col gap-2 px-1">
              {userSidebarData.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md hover:underline hover:text-themeColor 
                  ${item.path === pathname ? "text-themeColor " : ""}`}
                  onClick={() => setSideOpen(false)}
                >
                  <span className="flex items-center">
                    {typeof item.icon === "string" ? item.icon : <item.icon />}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                href={"#"}
                className={`mt-20 flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md hover:underline hover:text-themeColor 
                  ${"#" === pathname ? "text-themeColor " : ""}`}
              >
                <span className="flex items-center">
                  <FiUserCheck />
                </span>
                <span>Become a seller</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
