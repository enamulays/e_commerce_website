"use client";

import { useAllProductsQuery } from "@/api/productsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setFilteredProducts } from "@/redux/reducers/allProductsFilter";

import { Product } from "@/type_local";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { data } = useAllProductsQuery([]);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pathname !== "/") {
      router.push("/");
    }
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (data?.products) {
      const filteredProducts = data?.products?.filter((product: Product) =>
        product.title.toLowerCase().includes(search.toLocaleLowerCase().trim())
      );
      dispatch(setFilteredProducts(filteredProducts));
    }
  }, [data, search, dispatch]);

  return (
    <div className="hidden md:inline-flex flex-1 h-10 relative">
      <Input
        type="text"
        placeholder="Search products here..."
        value={search}
        className="w-full h-full border-2 border-themeColor px-4 outline-none rounded-none"
        onChange={(e) => handleInputSearch(e)}
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
