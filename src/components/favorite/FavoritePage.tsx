"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useUserQuery } from "@/api/userApi";
import Loader from "../Loader";
import { Product } from "@/type_local";
import Container from "../Container";
import AddToCartButton from "../AddToCartButton";
import WishListButton from "../WishListButton";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function FavoritePage() {
  const { data, isSuccess } = useUserQuery({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const wishlist: Product[] = data?.user?.wishlist;

  if (wishlist.length <= 0) {
    return (
      <div className="h-screen flex flex-col justify-start mt-[10%] items-center">
        <h2>There are no items in the cart</h2>
        <Link
          href={"/"}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 mt-4 border border-orange-600
              px-6 py-2 rounded-md"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    isSuccess && (
      <Container className="py-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          {wishlist.length > 0 &&
            wishlist.map((product) => (
              <Card key={product._id} className="">
                <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4">
                  <div className="flex justify-start gap-4">
                    <Link
                      href={{
                        pathname: `/products/${product?._id}`,
                        query: product?.title,
                      }}
                      className="max-h-36 max-w-36 h-auto w-full"
                    >
                      <Image
                        src={product?.images[0]}
                        alt="image"
                        height={100}
                        width={100}
                        className="max-h-36 max-w-36 h-auto w-full"
                        priority
                      />
                    </Link>
                    <div>
                      <h3 className="font-semibold">{product?.title}</h3>
                      <p className="text-sm text-gray-500">
                        ৳{product?.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-orange-800 font-normal">
                        Brand:{" "}
                        <span className="text-orange-600">
                          {product?.brand}
                        </span>
                      </p>
                      <p className="text-xs font-normal text-gray-600 mt-2">
                        {product?.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="bg-white text-skyColor hover:text-skyColor/80
                                 hover:bg-gray-100 border-skyColor border rounded-md p-1 mt-2"
                          >
                            <MdFavoriteBorder
                              className="text-skyColor "
                              size={25}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogTitle>Remove from wishlist</DialogTitle>
                          <DialogDescription>
                            Item(s) will be removed from order
                          </DialogDescription>
                          <DialogFooter>
                            <WishListButton
                              product={product}
                              className="border border-skyColor  hover:border-skyColor/80 hover:bg-gray-100 rounded-full p-2 mt-2"
                            >
                              Remove
                            </WishListButton>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex items-center justify-center">
                      <AddToCartButton
                        product={product}
                        className="px-2 hover:bg-gray-100 hover:border-skyColor"
                      >
                        <MdOutlineShoppingCart
                          size={24}
                          className="text-skyColor"
                        />
                      </AddToCartButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
    )
  );
}

export default FavoritePage;
