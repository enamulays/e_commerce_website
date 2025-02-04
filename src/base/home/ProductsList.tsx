"use client";
import { useAllProductsQuery } from "@/api/productsApi";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/type_local";
import React from "react";
import Banner from "./Banner";

function ProductsList() {
  const { data, isLoading, isFetching, isSuccess, isError } =
    useAllProductsQuery({});

  if (isLoading || isFetching) {
    return <div></div>;
  }
  if (isError) {
    return <div>Failed to fetch Products</div>;
  }

  return (
    isSuccess && (
      <>
        <Banner />
        <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-12">
          {data?.products?.map((product: Product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </Container>
      </>
    )
  );
}

export default ProductsList;
