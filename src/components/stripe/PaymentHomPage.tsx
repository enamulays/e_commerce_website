"use client";

import Loader from "@/components/Loader";
import CheckoutForm from "@/components/stripe/CheckoutForm";
import StripeElementWrap from "@/components/stripe/StripeElementWrap";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function PaymentHomPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret") || undefined;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    const referrer = document.referrer;
    console.log(referrer);

    // if (!referrer) {
    //   router.push("/");
    // }
  }, [router, clientSecret]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center h-screen">
      <StripeElementWrap clientSecret={clientSecret}>
        <CheckoutForm />
      </StripeElementWrap>
    </div>
  );
}

export default PaymentHomPage;
