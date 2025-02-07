"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/type_local";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader";

function ProductsList() {
  const [loading, setLoading] = useState<boolean>(true);
  const products = useSelector(
    (state: RootState) => state.allProductsSlice.filteredProducts
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return products.length > 0 ? (
    <>
      <Banner />
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-12">
        {products?.map((product: Product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </Container>
    </>
  ) : (
    <div className="flex justify-center mt-20">
      <p className=" text-orange-600 border border-orange-600 px-10 py-2 rounded-md ">
        No products available
      </p>
    </div>
  );
}

export default ProductsList;
