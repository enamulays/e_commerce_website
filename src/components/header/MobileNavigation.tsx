"use client";
import { navigation } from "@/constants";
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import SocialLinks from "../SocialLinks";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-2xl text-gray-500 cursor-pointer hover:text-themeColor"
      >
        <FaBarsStaggered />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 text-white/80"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/90 ">
          <DialogPanel className="w-[94%] space-y-4 bg-primary p-6 border border-lightText rounded-md absolute top-10 m-5 bg-black">
            <div className="flex items-center justify-between gap-5">
              <h3>Navigation Menu</h3>
              <button
                className="text-white/40 text-2xl hover:text-red-600 duration-300 border border-white/20 rounded-sm hover:border-white/40"
                onClick={() => setIsOpen(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="hover:text-skyColor relative group flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-white/80 inline-flex group-hover:border-skyColor" />
                  {item.title}
                </Link>
              ))}
            </div>
            <SocialLinks />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default MobileNavigation;
