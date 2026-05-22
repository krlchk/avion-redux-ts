import {
  formatProfileDate,
  formatProfileOrderPrice,
  formatProfileOrderStatus,
} from "../../model/profile.utils";
import type { ProfileOrderRowProps } from "../../model/types";
import { ProfileOrderItemRow } from "./ProfileOrderItemRow";
import { ProfileOrderMeta } from "./ProfileOrderMeta";
import { ProfileOrderPriceRow } from "./ProfileOrderPriceRow";

export const ProfileOrderRow = ({ order }: ProfileOrderRowProps) => {
  const promoCodeLabel = order.promoCode
    ? `${order.promoCode.code} (${order.promoCode.type === "PERCENT" ? `${order.promoCode.value}%` : formatProfileOrderPrice(order.promoCode.value)})`
    : "No promo code";
  const hasDiscount = Number(order.promoDiscountAmount) > 0;

  return (
    <article className="border-b border-black/10 py-7">
      <div className="tablet:grid-cols-2 mobile:grid-cols-1 grid grid-cols-[1.2fr_0.9fr_0.8fr_0.8fr] items-center gap-6">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-black uppercase">
            #{order.id.slice(0, 8)}...
          </p>
          <p className="mt-2 text-sm font-medium text-black/45">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <ProfileOrderMeta
          label="Date"
          value={formatProfileDate(order.createdAt)}
        />
        <ProfileOrderMeta
          label="Status"
          value={formatProfileOrderStatus(order.status)}
          valueClassName="text-[#947458]"
        />
        <ProfileOrderMeta
          label="Total"
          value={formatProfileOrderPrice(order.totalPrice)}
          className="tablet:text-left mobile:text-left text-right"
        />
      </div>

      <div className="tablet:hidden mobile:hidden mt-6 grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] gap-4 border-y border-black/10 py-4 text-xs font-medium tracking-[0.18em] text-black/35 uppercase">
        <p>Product</p>
        <p>Qty</p>
        <p>Price</p>
        <p className="text-right">Line total</p>
      </div>

      <div>
        {order.items.map((item) => (
          <ProfileOrderItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="tablet:grid-cols-1 mobile:grid-cols-1 mt-6 grid grid-cols-[1fr_280px] gap-8">
        <div className="border border-[#947458]/15 bg-[#947458]/5 p-5">
          <p className="text-sm font-bold tracking-[0.14em] text-[#947458] uppercase">
            Promo code
          </p>
          <p className="mt-3 text-base font-bold text-black">
            {promoCodeLabel}
          </p>
          <p className="mt-2 text-sm leading-6 font-medium text-black/45">
            {hasDiscount
              ? `Discount applied: ${formatProfileOrderPrice(order.promoDiscountAmount)}`
              : "No discount was applied to this order."}
          </p>
        </div>

        <div className="grid gap-3 text-sm font-medium">
          <ProfileOrderPriceRow
            label="Subtotal"
            value={formatProfileOrderPrice(
              order.subtotalPrice ?? order.totalPrice,
            )}
          />
          <ProfileOrderPriceRow
            label="Promo discount"
            value={`-${formatProfileOrderPrice(order.promoDiscountAmount)}`}
          />
          <ProfileOrderPriceRow
            label="Total"
            value={formatProfileOrderPrice(order.totalPrice)}
            isTotal
          />
        </div>
      </div>

      {order.status === "PENDING" && (
        <div className="mt-6 flex flex-wrap justify-end gap-4">
          <button
            type="button"
            className="cursor-pointer bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg"
          >
            Pay order
          </button>
          <button
            type="button"
            className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458]"
          >
            Cancel order
          </button>
        </div>
      )}
    </article>
  );
};
