
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { ProductsListType } from "@/type_local";
import React from "react";

function ProductsList(products: ProductsListType) {

  return (
    <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-12">
      {products?.products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </Container>
  );
}

export default ProductsList;
