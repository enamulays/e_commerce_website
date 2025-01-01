"use clientt";
import { Product } from "@/type_local";
import Image from "next/image";
import React from "react";
import {
  MdFavoriteBorder,
  MdOutlineRemoveRedEye,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Link from "next/link";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-start border border-gray-400 rounded-lg relative hover:shadow-black/30 overflow-hidden hover:shadow-lg duration-200 group">
      {/* Image Area */}
      <Link
        href={{
          pathname: `/products/${product?.id}`,
          query: { id: product?.id },
        }}
        className="h-60 relative"
      >
        <div className="w-full flex justify-center items-center  hover:scale-110 duration-200 ">
          <Image
            src={product?.images[0]}
            alt={`${product?.title} images`}
            width={220}
            height={220}
            className="max-h-60 py-1 h-full w-auto"
          />
        </div>
        <p className="absolute top-3 right-3 text-xs rounded-md text-white bg-orange-600 p-1">
          {product?.discountPercentage}%
        </p>
      </Link>

      {/* Description Area */}

      <div className="border-t border-t-borderColor p-4">
        <div className="flex flex-col space-y-0.5">
          <p className="text-sm font-medium text-lightText">
            {product?.category}
          </p>
          <h2 className="text-sm font-semibold text-black">{product?.title}</h2>
          <ProductPrice product={product} />
        </div>
        <div className="flex justify-center mt-4">
          <AddToCartButton />
        </div>
      </div>

      {/* Hover Button Area */}

      <div className="absolute top-1/4 group-hover:right-4 -right-12 border border-borderColor rounded-md  text-2xl flex flex-col justify-center bg-white duration-200">
        <button className="p-1 hover:text-skyColor border-b border-b-borderColor">
          <MdOutlineShoppingCart />
        </button>
        <button className="p-1 hover:text-skyColor  border-b border-b-borderColor">
          <MdOutlineRemoveRedEye />
        </button>
        <button className="p-1 hover:text-skyColor">
          <MdFavoriteBorder />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
