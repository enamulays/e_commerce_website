import { bannerImage } from "@/assets";
import { CgProfile } from "react-icons/cg";
import { PiAddressBook } from "react-icons/pi";
import { AiOutlineDollar } from "react-icons/ai";
import { IoMdReturnRight } from "react-icons/io";
import { PiShoppingCart } from "react-icons/pi";

export const navigation = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
  { title: "Offers", href: "/offers" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const bannerData = {
  priceText: "Starting at $ 999.90",
  title: "The best tablet Collection 2023",
  textOne: "Exclusive offer",
  offerPrice: "-30%",
  textTwo: "off this week",
  buttonLink: "/products",
  image: bannerImage,
};

export const userSidebarData = [
  {
    label: "My Profile",
    icon: CgProfile,
    path: "/profile",
  },
  {
    label: "Address Book",
    icon: PiAddressBook,
    path: "/profile/address",
  },
  {
    label: "My Parment Options",
    icon: AiOutlineDollar,
    path: "/profile/payemnt-options",
  },

  {
    label: "My Returns",
    icon: IoMdReturnRight,
    path: "/returns",
  },
  {
    label: "My Orders",
    icon: PiShoppingCart,
    path: "/orders",
  },
];
