"use client";

import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/type_local";
import Link from "next/link";
import { useUserQuery } from "@/api/userApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  useDeleteCartMutation,
  useUpdateQuantityMutation,
} from "@/api/cartApi";
import toast from "react-hot-toast";
import PaymentSection from "./PaymentSection";

export default function CartPage() {
  const { data, isError, isFetching, isSuccess, refetch } = useUserQuery({});
  const [updateQuantity] = useUpdateQuantityMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(
    data?.user?.shoppingCart ?? []
  );

  const handleUpdateQuantity = async (cartId: string, endPoints: string) => {
    try {
      const response = await updateQuantity({ cartId, endPoints }).unwrap();
      toast.success(response?.message);
      setCartItems((prevItem) =>
        prevItem.map((cart) =>
          cart._id === cartId
            ? { ...cart, quantity: response?.updatedQuantity }
            : cart
        )
      );
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  const handleDeleteCart = async (cartId: string) => {
    try {
      const response = await deleteCart(cartId).unwrap();
      toast.success(response?.message);
      refetch();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    if (data?.user?.shoppingCart) {
      setCartItems(data?.user?.shoppingCart);
    }
    setIsLoading(false);
  }, [data]);

  if (isFetching || isLoading) {
    return <div></div>;
  }
  if (isError) {
    return <div>Failed to fetching data</div>;
  }

  if (cartItems.length <= 0) {
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
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr] ">
          <div className="space-y-4">
            {cartItems.length > 0 &&
              cartItems.map((cart) => (
                <Card key={cart._id} className="">
                  <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4">
                    <div className="flex justify-start gap-4">
                      <Link
                        href={{
                          pathname: `/products/${cart?.productId?._id}`,
                          query: cart?.productId?.title,
                        }}
                        className="max-h-36 max-w-36 h-auto w-full"
                      >
                        <Image
                          src={cart?.productId?.images[0]}
                          alt="image"
                          height={100}
                          width={100}
                          className="max-h-36 max-w-36 h-auto w-full"
                          priority
                        />
                      </Link>
                      <div>
                        <h3 className="font-semibold">
                          {cart?.productId?.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ৳{cart?.productId?.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-orange-800 font-normal">
                          Brand:{" "}
                          <span className="text-orange-600">
                            {cart?.productId?.brand}
                          </span>
                        </p>
                        <p className="text-xs font-normal text-gray-600 mt-2">
                          {cart?.productId?.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end sm:items-center w-full sm:w-auto space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        disabled={cart?.quantity <= 1}
                        onClick={() =>
                          handleUpdateQuantity(cart?._id, "/cart/decrement")
                        }
                      >
                        <FiMinus className="h-4 w-4" />
                      </Button>
                      <div className="py-1 px-3 inline-flex border rounded-sm">
                        {cart?.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        disabled={cart?.quantity >= cart?.productId?.stock}
                        onClick={() =>
                          handleUpdateQuantity(cart?._id, "/cart/increment")
                        }
                      >
                        <FiPlus className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogTitle>Remove from cart</DialogTitle>
                          <DialogDescription>
                            Item(s) will be removed from order
                          </DialogDescription>
                          <DialogFooter>
                            <Button
                              type="submit"
                              variant="destructive"
                              onClick={() => handleDeleteCart(cart?._id)}
                            >
                              Remove
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          <PaymentSection cartItems={cartItems} />
        </div>
      </div>
    )
  );
}
