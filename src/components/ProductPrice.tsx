"use client";
import { Product } from "@/type_local";
import React from "react";
import PriceFormat from "./PriceFormat";

function ProductPrice({ product }: { product: Product }) {
  const regular = product?.price;
  const discountPrice = regular - (regular * product?.discountPercentage) / 100;
  return (
    <div className="flex gap-3">
      <PriceFormat
        amount={regular}
        className="font-normal line-through text-lightText"
      />
      <PriceFormat amount={discountPrice} className="font-semibold text-skyColor" />
    </div>
  );
}

export default ProductPrice;
