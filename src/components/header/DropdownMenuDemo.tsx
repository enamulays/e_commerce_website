"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMoneyDollarCircleLine, RiShoppingBag3Line } from "react-icons/ri";
import Link from "next/link";
import { IoIosHeartEmpty, IoIosLogOut } from "react-icons/io";
import { User } from "@/type_local";

const menuItem = [
  {
    label: "Profile",
    icon: <FaRegUserCircle size={16} />,
    path: "/profile",
  },
  {
    label: "Billing",
    icon: <RiMoneyDollarCircleLine size={19} />,
    path: "/billing",
  },
  {
    label: "My Orders",
    icon: <RiShoppingBag3Line size={18} />,
    path: "/order",
  },
  {
    label: "My Wishlist",
    icon: <IoIosHeartEmpty size={18} />,
    path: "/favorite",
  },
];

export default function DropdownMenuDemo({
  user,
  handleLogout,
}: {
  user: User;
  handleLogout: () => void;
}) {

 
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.avatar || "/user-avater.png"}
            alt={user?.name || user?.username || "User"}
            onError={(e) => (e.currentTarget.src = "/user-avater.png")}
          />
          <AvatarFallback>
            {user?.name?.[0] || user?.username?.[0] || ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItem.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex gap-2 justify-start items-center h-full w-full hover:bg-gray-100 rounded-sm"
            >
              <DropdownMenuItem className="cursor-pointer my-1 w-full">
                <span className="w-5 flex justify-center">{item.icon}</span>
                {item.label}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <span className="w-5 flex justify-center">
            <IoIosLogOut size={16} />
          </span>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
