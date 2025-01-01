import { notFound } from "@/assets";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <Container className="flex flex-col gap-2 items-center py-10">
      <Image src={notFound} alt="not-found-image" />
      <Link
        href={"/"}
        className="bg-themeColor/90 hover:bg-themeColor py-2 px-6 rounded-md text-white/90"
      >
        Back to Home
      </Link>
    </Container>
  );
}

export default NotFound;
