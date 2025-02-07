"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartItem, VoucherItem } from "@/type_local";
import vouchers from "@/constants/vouchers.json";
import { usePaymentIntentMutation } from "@/api/stripeApi";
import { useRouter } from "next/navigation";

function PaymentSection({ cartItems }: { cartItems: CartItem[] }) {
  const [validVoucher, setValidVoucher] = useState<VoucherItem>();
  const [voucherInputValue, setVoucherInputValue] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntent] = usePaymentIntentMutation();
  const router = useRouter();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    amount: string
  ) => {
    e.preventDefault();
    try {
      const response = await paymentIntent(amount).unwrap();
      setClientSecret(response.clientSecret);
    } catch (error) {
      console.error(error);
    }
  };

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

  const price = cartItems.reduce(
    (acc, value) => acc + value.productId.price * value.quantity,
    0
  );

  const shippingFee = cartItems.length > 0 ? 80 : 0;
  const totalPayAmount = (
    price +
    shippingFee -
    (validVoucher?.discountValue ?? 0)
  ).toFixed(1);

  useEffect(() => {
    if (clientSecret) {
      return router.push(`/payment?clientSecret=${clientSecret}`);
    }
  }, [clientSecret, router]);

  return (
    <Card className="max-h-96 lg:sticky top-40">
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>Add Shipping Address</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e, totalPayAmount)}
        >
          <div className="flex items-center justify-between border-b ">
            <h3>
              Subtotal (
              {cartItems.reduce((acc, value) => acc + value.quantity, 0)} items)
            </h3>
            <p>৳{price.toFixed(1)}</p>
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
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-600/90 duartion-200"
              type="submit"
            >
              Proceed to Checkout
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PaymentSection;
