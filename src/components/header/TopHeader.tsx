import React from "react";
import Container from "../Container";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";

function TopHeader() {
  return (
    <div className="bg-[#010f1c] text-gray-200">
      <Container className="py-1 flex items-center justify-between">
        <p className="w-full md:w-auto flex justify-center items-center md:justify-normal font-medium py-1">
          <CiDeliveryTruck className="text-[#ffb342] text-2xl mr-1" />
          Free Express shipping on orders $570
        </p>
        <div className="hidden md:inline-flex items-center text-sm text-white">
          <p className="headerTopMenu">
            English
            <FaAngleDown />
          </p>
          <p className="headerTopMenu">
            USD
            <FaAngleDown />
          </p>
          <p className="headerTopMenu">
            Settings
            <FaAngleDown />
          </p>
        </div>
      </Container>
    </div>
  );
}

export default TopHeader;
