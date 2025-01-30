import CartItems from "@/components/cart/CartItems";
import Container from "@/components/Container";
import React from "react";

function page() {
  return (
    <Container className="py-4">
      <CartItems />
    </Container>
  );
}

export default page;
