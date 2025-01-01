"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

function SearchInput() {
  const [search, setSearch] = useState("");
  return (
    <div className="hidden md:inline-flex flex-1 h-10 relative">
      <Input
        type="text"
        placeholder="Search products here..."
        value={search}
        className="w-full h-full border-2 border-themeColor px-4 outline-none rounded-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <RxCross1
          className="text-lg absolute top-2.5 right-12 text-gray-500 hover:text-red-500 cursor-pointer duration-200"
          onClick={() => setSearch("")}
        />
      )}
      <Button className="w-10 h-10 bg-themeColor/80 inline-flex rounded-none border-themeColor hover:bg-themeColor duration-200">
        <CiSearch />
      </Button>
    </div>
  );
}

export default SearchInput;
