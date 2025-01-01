"use client";
import Image from "next/image";
import React, { useState } from "react";

function SingleProductImage({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="flex lg:flex-col gap-3">
        {images?.map((image, index) => (
          <Image
            key={index}
            onClick={() => setCurrentImage(image)}
            className={`border  w-18 h-22 hover:opacity-100 duration-200 cursor-pointer py-2 px-1 ${
              currentImage === image
                ? "border-gray-500 opacity-100"
                : "border-borderColor opacity-80 "
            }`}
            src={image}
            alt={`${image} image`}
            height={100}
            width={100}
          />
        ))}
      </div>
      <div className="bg-gray-100 max-h-[550px] w-full flex justify-center items-center p-2 sm:p-12 md:p-1">
        <Image
          src={currentImage}
          alt="product-images"
          height={500}
          width={500}
          priority
          className="w-full h-auto max-w-[500px]"
        />
      </div>
    </div>
  );
}

export default SingleProductImage;
