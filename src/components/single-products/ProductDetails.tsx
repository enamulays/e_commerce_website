"use client";

import React from "react";
import Container from "../Container";
import SingleProductImage from "./SingleProductImage";
import ProductPrice from "../ProductPrice";
import RatingStars from "../RatingStars";
import PriceFormat from "../PriceFormat";
import { FaRegEye } from "react-icons/fa";
import AddToCartButton from "../AddToCartButton";
import PaymentMethodIcons from "../PaymentMethodIcons";
import { useParams } from "next/navigation";
import { useSingleProductQuery } from "@/api/productsApi";
import { ProductReview } from "@/type_local";

function ProductDetails() {
  const { id } = useParams();
  const { data, isError, isLoading, isFetching, isSuccess } =
    useSingleProductQuery(id);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (isError) {
    return <div>Failed to fetch data</div>;
  }

  const { product } = data;
 

  return (
    isSuccess && (
      <Container className="flex flex-col gap-10 py-12 ">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <SingleProductImage images={product?.images} />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-bold text-3xl text-black">{product?.title}</h2>
            <div className="flex items-center justify-between">
              <ProductPrice product={product} />
              <div className="flex items-center gap-2">
                <RatingStars rating={product?.rating} />
                <p className="text-base font-semibold">{`(${product?.rating.toFixed(
                  1
                )} reviews)`}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FaRegEye />
              <span className="font-semibold">250+</span>
              peoples are viewing this right nows
            </div>
            <p>
              You are saving
              <span className="text-base font-semibold text-green-500 mx-1">
                {
                  <PriceFormat
                    amount={
                      (product?.price * product?.discountPercentage) / 100
                    }
                  />
                }
              </span>
              upon purchase
            </p>
            <div>
              <p className="text-sm tracking-wide">{product?.description}</p>
              <p className="text-base text-skyColor">
                {product?.warrantyInformation}
              </p>
            </div>
            <p>
              Brand: <span className="font-medium">{product?.brand}</span>
            </p>
            <p>
              Category:{" "}
              <span className="font-medium capitalize">
                {product?.category}
              </span>
            </p>
            <p>
              Tags:{" "}
              <span className="font-medium capitalize">
                {product?.tags.join(", ")}{" "}
              </span>
            </p>
            <div className="flex justify-center sm:justify-start sm:w-1/2 ">
              <AddToCartButton className="rounded-md" product={product} />
            </div>
            <PaymentMethodIcons />
          </div>
        </div>
        <div>
          <div className="p-10 bg-gray-100 flex items-center flex-wrap gap-10">
            {product?.reviews?.map((review: ProductReview, index: number) => (
              <div
                className="bg-white/80 p-5 border border-borderColor rounded-md flex flex-col gap-1"
                key={index}
              >
                <p className="text-base font-semibold">{review?.comment}</p>
                <div className="text-xs">
                  <p className="font-semibold">{review?.reviewerName}</p>
                  <p className="">{review?.reviewerEmail}</p>
                </div>
                <RatingStars rating={review?.rating} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    )
  );
}

export default ProductDetails;
