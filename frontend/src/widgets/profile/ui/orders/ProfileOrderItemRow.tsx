import Image from "next/image";
import Link from "next/link";

import { formatProfileOrderPrice } from "../../model/profile.utils";
import type { ProfileOrderItemRowProps } from "../../model/types";
import { ProfileOrderMeta } from "./ProfileOrderMeta";

export const ProfileOrderItemRow = ({ item }: ProfileOrderItemRowProps) => {
  return (
    <div className="tablet:grid-cols-2 mobile:grid-cols-1 grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] items-center gap-4 border-b border-black/5 py-4 last:border-b-0">
      <Link href={`/products/${item.productId}`} className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#eeedec]">
          {item.product?.img ? (
            <Image
              src={item.product.img}
              alt={item.product.title}
              fill
              unoptimized
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#947458]/10" />
          )}
        </div>
        <div>
          <p className="text-base font-bold text-black">
            {item.product?.title ?? `Product #${item.productId.slice(0, 8)}`}
          </p>
          <p className="mt-1 text-sm font-medium text-black/40">
            Product ID: {item.productId.slice(0, 8)}
          </p>
        </div>
      </Link>
      <ProfileOrderMeta label="Qty" value={String(item.quantity)} />
      <ProfileOrderMeta
        label="Price"
        value={formatProfileOrderPrice(item.price)}
      />
      <ProfileOrderMeta
        label="Line total"
        value={formatProfileOrderPrice(Number(item.price) * item.quantity)}
        className="tablet:text-left mobile:text-left text-right"
      />
    </div>
  );
};
