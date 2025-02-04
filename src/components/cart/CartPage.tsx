"use client";

import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import vouchers from "@/constants/vouchers.json";
import { useState } from "react";
import { CartItem, VoucherItem } from "@/type_local";
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

export default function CartPage() {
  const { data, isLoading, isError, isFetching, isSuccess } = useUserQuery({});
  const [voucherInputValue, setVoucherInputValue] = useState<string>("");
  const [validVoucher, setValidVoucher] = useState<VoucherItem>();
  const [inputValue, setInputValue] = useState<string>("1")

  const handleSubmit = () => {};

  const handleValidVoucher = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const voucherItem = vouchers.find(
      (voucher) => voucher.code === voucherInputValue
    );
    if (voucherItem) {
      setValidVoucher(voucherItem);
      alert(`Voucher Applied: ${voucherItem.description}`);
    } else {
      setValidVoucher(undefined);
      alert(`Invalid voucher code!`);
    }
  };

  if (isFetching || isLoading) {
    return <div></div>;
  }
  if (isError) {
    return <div>Failed to fetching data</div>;
  }

  const cartItems: CartItem[] = data?.user?.shoppingCart ?? [];

  const price = cartItems.reduce(
    (acc, value) => acc + value.productId.price * value.quantity,
    0
  );

  const shippingFee = cartItems.length > 0 ? 80 : 0;
  const totalPayAmount =
    price + shippingFee - (validVoucher?.discountValue ?? 0);

  console.log(cartItems);
  return (
    isSuccess && (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr] ">
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((cart) => (
                <Card key={cart._id} className="">
                  <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4">
                    <div className="flex justify-start gap-4">
                      <Image
                        src={cart?.productId?.images[0]}
                        alt="image"
                        height={100}
                        width={100}
                        priority
                      />
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
                        disabled={cart?.quantity === 1}
                      >
                        <FiMinus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        className="w-16 text-center"
                        value={cart?.quantity}
                        onChange={(e)=>setInputValue(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
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
                              // onClick={() => removeCartItems(item.id)}
                            >
                              Remove
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
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
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Add Shipping Address</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between border-b ">
                  <h3>
                    Subtotal (
                    {cartItems.reduce((acc, value) => acc + value.quantity, 0)}{" "}
                    items)
                  </h3>
                  <p>৳{price}</p>
                </div>
                <div className="flex items-center justify-between border-b">
                  <h3>Shipping Fee</h3>
                  <p>৳{shippingFee}</p>
                </div>
                <div className="grid grid-cols-[2fr_1fr] w-full items-center gap-4">
                  <Input
                    id="name"
                    placeholder="Enter Voucher Code"
                    onChange={(e) => setVoucherInputValue(e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={handleValidVoucher}
                  >
                    Apply
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Total:</h3>
                  <p className="text-lg font-semibold">৳{totalPayAmount}</p>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="w-full sm:w-auto bg-orange-600"
                    type="button"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}
