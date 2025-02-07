import CompletePage from "@/components/stripe/CompletePage";
import StripeElementWrap from "@/components/stripe/StripeElementWrap";
import React from "react";
function  page() {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <StripeElementWrap>
        <CompletePage />
      </StripeElementWrap>
    </div>
  );
}

export default page;
