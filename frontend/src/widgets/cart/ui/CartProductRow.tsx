import Image from "next/image";
import Link from "next/link";

import { formatCartPrice } from "../model/cart.utils";
import type { CartProductRowProps } from "../model/types";

export const CartProductRow = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
  product,
}: CartProductRowProps) => {
  const quantity = item.count;
  const productSubtotal = product.finalPrice * quantity;
  const isIncreaseDisabled = product.stock === 0 || quantity >= product.stock;

  return (
    <div className="grid grid-cols-[1.7fr_0.7fr_0.7fr] items-center gap-6 border-t border-black/10 py-9">
      <Link href={`/products/${product.id}`} className="flex items-center gap-8">
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
        <div>
          <p className="text-xl font-medium tracking-wide text-black uppercase">
            {product.title}
          </p>
          <p className="mt-2 text-base font-medium text-black/40">
            {quantity} x {formatCartPrice(product.finalPrice)}
          </p>
        </div>
      </Link>

      <div className="flex justify-center">
        <div className="flex h-14 min-w-38 items-center justify-between border border-black/10 bg-[#f5f5f5] text-xl font-medium text-black">
          <button
            type="button"
            onClick={onDecrease}
            disabled={quantity <= 1}
            className="h-full w-full cursor-pointer text-black/70 transition-colors hover:text-[#947458] disabled:cursor-not-allowed disabled:text-black/20"
          >
            -
          </button>
          <span className="px-4 text-black">{quantity}</span>
          <button
            type="button"
            onClick={onIncrease}
            disabled={isIncreaseDisabled}
            className="h-full w-full cursor-pointer text-black/70 transition-colors hover:text-[#947458] disabled:cursor-not-allowed disabled:text-black/20"
          >
            +
          </button>
        </div>
      </div>

      <p className="mobile:text-left text-right text-xl font-bold text-black">
        {formatCartPrice(productSubtotal)}
      </p>
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
