import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

function RatingStars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={twMerge("flex gap-1", className)}>
      {[...Array.from({ length: 5 })].map((_, index) => {
        const filledRating = Math.floor(rating) >= index + 1;
        const halfFilled = rating < index + 1 && Math.ceil(rating) >= index + 1;
        return (
          <div
            key={index}
            className={`${
              filledRating
                ? "text-yellow-500"
                : halfFilled
                ? " text-yellow-500"
                : "opacity-70 "
            }`}
          >
            {filledRating ? (
              <FaStar />
            ) : halfFilled ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default RatingStars;
