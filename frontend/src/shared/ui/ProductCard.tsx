import { Like } from "../icons";
import { ProductCardProps } from "../model/types";
import Image from "next/image";

export const ProductCard = ({
  title,
  image,
  price,
  oldPrice,
  badge,
  isDiscount,
}: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col gap-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-306/350 w-full overflow-hidden bg-[#F6F4F2]">
        {image ? (
          <Image
            alt={title}
            src={image}
            fill
            unoptimized
            sizes="(max-width: 834px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      <div className="absolute right-2.5 bottom-28 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white transition-all duration-300 group-hover:border-[#947458] group-hover:shadow-md">
        <Like
          className="hover:fill-[#FB5454] hover:transition-colors"
          stroke="#8F909B"
        />
      </div>
    </div>
  );
};
