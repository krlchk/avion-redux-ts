"use client";

import Image from "next/image";
import { ProductCatalogCardProps } from "../../model/types";
import { Like } from "@/shared/icons";

export const ProductCatalogCard = ({
  title,
  image,
  price,
  oldPrice,
  badge,
  isDiscount,
}: ProductCatalogCardProps) => {
  return (
    <div className="relative flex flex-col gap-6 text-center">
      <div className="relative aspect-306/350 w-full bg-[#F6F4F2]">
        {image ? (
          <Image
            alt={title}
            src={image}
            fill
            unoptimized
            sizes="(max-width: 834px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover"
          />
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
          className={`absolute top-6 left-6 px-5 py-2 text-xl font-normal text-white uppercase ${
            badge === "new" ? "bg-black" : "bg-[#FB5454]"
          }`}
        >
          {badge}
        </div>
      )}
      <div className="group absolute right-2.5 bottom-28 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white">
        <Like
          className="group-hover:fill-[#FB5454] group-hover:transition-colors"
          stroke="#8F909B"
        />
      </div>
    </div>
  );
};
