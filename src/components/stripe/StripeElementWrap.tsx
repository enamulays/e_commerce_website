"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined"
  );
}

// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function StripeElementWrap({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret?: string ;
}) {
  const appearance = {
    theme: "stripe",
  } as StripeElementsOptions["appearance"];
  const loader = "auto";
  return (
    <Elements
      options={{ clientSecret, appearance, loader }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}

export default StripeElementWrap;
