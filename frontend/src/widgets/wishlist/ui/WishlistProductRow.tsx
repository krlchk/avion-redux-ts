import Image from "next/image";
import Link from "next/link";

import { SimpleButton } from "@/shared/ui";
import type { WishlistProductRowProps } from "../model/types";

export const WishlistProductRow = ({
  onAddToCart,
  onRemove,
  product,
}: WishlistProductRowProps) => {
  const isInStock = product.stock > 0;

  return (
    <div className="mobile:grid-cols-1 mobile:gap-10 mobile:flex mobile:flex-col mobile:items-center mobile:justify-center grid grid-cols-[1.7fr_0.8fr_0.8fr_0.9fr] items-center gap-6 border-t border-black/10 py-8">
      <Link
        href={`/products/${product.id}`}
        className="mobile:flex mobile:flex-col mobile:items-center mobile:justify-center flex items-center gap-8"
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#eeedec]">
          {product.img ? (
            <Image
              src={product.img}
              alt={product.title}
              fill
              unoptimized
              sizes="80px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#c0bebd]">
              No image
            </div>
          )}
        </div>
        <p className="mobile:text-base text-base font-medium tracking-wide text-black uppercase">
          {product.title}
        </p>
      </Link>

      <p className="text-base font-bold text-black">
        ${product.finalPrice}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="ml-2 text-base font-medium text-black/40 line-through">
            ${product.price}
          </span>
        )}
      </p>

      <p
        className={`text-sm font-medium tracking-[0.12em] uppercase ${
          isInStock ? "text-black" : "text-[#FB5454]"
        }`}
      >
        {isInStock ? "In stock" : "Out of stock"}
      </p>

      <div className="mobile:col-span-1 mobile:justify-start grid justify-end gap-2">
        <SimpleButton
          onClick={onAddToCart}
          styles="h-12 min-w-44 !text-sm justify-center uppercase tracking-[0.12em]"
          text={isInStock ? "+ Add to cart" : "Out of stock"}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="col-span-full w-fit cursor-pointer text-sm font-medium tracking-[0.12em] text-black/35 uppercase transition-colors hover:text-[#947458]"
      >
        Remove
      </button>
    </div>
  );
};
