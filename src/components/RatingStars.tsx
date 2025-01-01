import React from "react";
import { IoStar } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

function RatingStars({
  rating,
  className,
  starClass,
}: {
  rating: number;
  className?: string;
  starClass?: string;
}) {
  return (
    <div className={twMerge("flex gap-1", className)}>
      {[...Array.from({ length: 5 })].map((_, index) => {
        const filledRating = Math.floor(rating) >= index + 1;
        const halfFilled = rating < index + 1 && Math.ceil(rating) >= index + 1;
        return (
          <div
            key={index}
            className={twMerge(
              `${
                filledRating
                  ? "text-orange-600"
                  : halfFilled
                  ? " text-yellow-500"
                  : "opacity-70 "
              }`,
              starClass
            )}
          >
            <IoStar />
          </div>
        );
      })}
    </div>
  );
}

export default RatingStars;
