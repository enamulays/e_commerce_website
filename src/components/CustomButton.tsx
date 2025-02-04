"use client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function CustomButton({ children, className, disabled, href, onClick }: Props) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={twMerge(
            "cursor-pointer flex items-center gap-1 bg-themeWhite text-black rounded-md w-32 px-0 justify-center text-sm font-semibold hover:bg-transparent hover:text-themeWhite py-3 border border-transparent hover:border-white/40 duration-200",
            className
          )}
        >
          {children}
        </Link>
      ) : (
        <button
          disabled={disabled}
          type="button"
          onClick={onClick}
          className={twMerge(
            "cursor-pointer flex items-center gap-1 bg-themeWhite text-black rounded-md w-32 px-0 justify-center text-sm font-semibold hover:bg-transparent hover:text-themeWhite py-3 border border-transparent hover:border-white/40 duration-200",
            className
          )}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default CustomButton;
