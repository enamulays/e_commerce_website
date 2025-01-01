import { cn } from "@/lib/utils";
import React from "react";

function PriceFormat({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return <span className={cn(className)}>{formattedPrice}</span>;
}

export default PriceFormat;
