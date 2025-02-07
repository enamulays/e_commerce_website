import React from "react";
import Container from "../Container";
import { navigation } from "@/constants/data";
import Link from "next/link";

function BottomHeader() {
  return (
    <div className="border-b border-b-gray-400 hidden md:block  ">
      <Container className="flex items-center justify-between py-1">
        <div className="text-xs md:text-sm font-medium flex items-center gap-2 md:gap-5">
          {navigation?.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="hover:text-themeColor duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <p className="hidden md:inline-flex text-xs text-gray-400 font-medium ">
          <span className="text-orange-600">Hotline:</span> <span className="text-black"> +8801723038039</span>
        </p>
      </Container>
    </div>
  );
}

export default BottomHeader;
