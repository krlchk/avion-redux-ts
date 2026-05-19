"use client";

import { Like } from "../icons";
import { ProductCardProps } from "../model/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export const ProductCard = ({
  title,
  image,
  price,
  oldPrice,
  badge,
  isDiscount,
}: ProductCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(Boolean(image));

  useEffect(() => {
    setIsImageLoading(Boolean(image));
  }, [image]);

  return (
    <div className="group relative flex flex-col gap-6 text-center transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-306/350 w-full overflow-hidden bg-[#eeedec]">
        {image ? (
          <>
            {isImageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#eeedec]">
                <Loader styles="h-8 w-8 border-3 border-[#947458]/20 border-t-[#947458]" />
              </div>
            )}
            <Image
              alt={title}
              src={image}
              fill
              unoptimized
              sizes="(max-width: 834px) 100vw, (max-width: 1279px) 50vw, 33vw"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center font-bold text-[#c0bebd]">
            Image not provided
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="mobile:text-xl text-2xl font-bold text-black">{title}</p>
        <p className="mobile:text-base mt-5 text-xl font-medium text-black/60">
          {isDiscount ? (
            <>
              ${price}{" "}
              {oldPrice && <span className="line-through">${oldPrice}</span>}
            </>
          ) : (
            <span>${price}</span>
          )}
        </p>
      </div>
      {badge && (
        <div
          className={`absolute top-6 left-6 px-5 py-2 text-xl font-normal text-[#f5f5f5] uppercase ${
            badge === "new" ? "bg-black" : "bg-[#FB5454]"
          }`}
        >
          {badge}
        </div>
      )}
      <div className="group/like absolute right-2.5 bottom-28 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#947458]/35 bg-[#f5f5f5] transition-all duration-300 hover:border-[#947458] hover:shadow-md">
        <Like
          className="text-[#947458] transition-colors duration-300 group-hover/like:fill-[#947458]"
          stroke="currentColor"
        />
      </div>
    </div>
  );
};
