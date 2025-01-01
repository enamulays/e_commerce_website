import Container from "@/components/Container";
import CustomButton from "@/components/CustomButton";
import { bannerData as banner } from "@/constants";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

function Banner() {
  return (
    <div className="bg-[#115061] text-themeWhite py-20">
      <Container className="flex flex-col-reverse gap-5 md:flex-row items-start md:items-center justify-between">
        <div className="flex flex-col gap-5">
          <p className="text-base font-semibold">{banner.priceText}</p>
          <h2 className="text-5xl font-bold max-w-[500]">{banner.title}</h2>
          <p className="text-lg font-bold">
            {banner.textOne}{" "}
            <span className="text-lightYellow mx-1">{banner.offerPrice} </span>
            {banner.textTwo}
          </p>
          <CustomButton href="/products">
            Shop now
            <FaArrowRight />
          </CustomButton>
        </div>
        <Image src={banner.image} alt="bannerImage" priority />
      </Container>
    </div>
  );
}

export default Banner;
