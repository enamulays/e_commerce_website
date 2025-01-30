"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const [loding, setloading] = useState(true);
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    setloading(false);
  }, []);

  if (loding) {
    return null;
  }

  return (
    <div className="relative  py-10">
      <Card className="h-[70vh] sticky top-40 w-56">
        <div className=" py-4">
          <div className="flex flex-col gap-2 px-1">
            {sideItem.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`flex py-2 hover:bg-gray-100 px-2 rounded-md hover:underline hover:text-themeColor 
                  ${item.path === pathname ? "text-themeColor " : ""}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

const sideItem = [
  {
    label: "My Profile",
    icon: "",
    path: "/profile",
  },
  {
    label: "Address Book",
    icon: "",
    path: "/profile/address",
  },
  {
    label: "My Parment Options",
    icon: "",
    path: "/profile/payemnt-options",
  },

  {
    label: "My Returns",
    icon: "",
    path: "/returns",
  },
  {
    label: "My Orders",
    icon: "",
    path: "/orders",
  },
];
