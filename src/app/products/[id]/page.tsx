import ProductDetails from "@/components/single-products/ProductDetails";
import { getData } from "@/api";
import { Product } from "@/type_local";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const endPoint = `https://dummyjson.com/products/${id}`;
  const product: Product = await getData(endPoint);

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}
