import React from "react";
import AmericanExpressIcon from "./icons/AmericanExpressIcon";
import MasterCardIcon from "./icons/MasterCardIcon";
import PaypalIcon from "./icons/PaypalIcon";
import VisaCardIcon from "./icons/VisaCardIcon";
import GooglePayIcon from "./icons/GooglePayIcon";
import { twMerge } from "tailwind-merge";

function PaymentMethodIcons({
  className,
  iconClass,
}: {
  className?: string;
  iconClass?: string;
}) {
  return (
    <div className={twMerge("flex flex-col items-center justify-center bg-gray-100 py-4 rounded-sm gap-1", className)}>
      <div className={twMerge("flex items-center gap-3 h-8", iconClass)}>
        <AmericanExpressIcon />
        <MasterCardIcon />
        <PaypalIcon />
        <VisaCardIcon />
        <GooglePayIcon />
      </div>
      <p className="text-sm font-semibold">Gauranteed Safe & Secure Payment</p>
    </div>
  );
}

export default PaymentMethodIcons;
