import { ArrowDown } from "@/shared/icons";
import { useCreatePaymentIntentMutation } from "@/store/services/paymentsApi";
import { useCancelOrderMutation } from "@/store/services/ordersApi";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  formatProfileDate,
  formatProfileOrderPrice,
  formatProfileOrderStatus,
  getProfileActionErrorMessage,
} from "../../model/profile.utils";
import type { PaymentNotice, ProfileOrderRowProps } from "../../model/types";
import { ProfileConfirmModal } from "../profile/ProfileConfirmModal";
import { ProfileOrderItemRow } from "./ProfileOrderItemRow";
import { ProfileOrderMeta } from "./ProfileOrderMeta";
import { ProfileOrderPaymentModal } from "./ProfileOrderPaymentModal";
import { ProfileOrderPriceRow } from "./ProfileOrderPriceRow";
import { ProfilePaymentNoticeModal } from "./ProfilePaymentNoticeModal";

export const ProfileOrderRow = ({ order }: ProfileOrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [cancelErrorMessage, setCancelErrorMessage] = useState("");
  const [paymentNotice, setPaymentNotice] = useState<PaymentNotice | null>(
    null,
  );
  const [paymentIntent, setPaymentIntent] = useState<{
    clientSecret: string;
    paymentIntentId: string;
  } | null>(null);
  const [createPaymentIntent, { isLoading: isCreatePaymentIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [cancelOrder, { isLoading: isCancelLoading }] =
    useCancelOrderMutation();
  const promoCodeLabel = order.promoCode
    ? `${order.promoCode.code} (${order.promoCode.type === "PERCENT" ? `${order.promoCode.value}%` : formatProfileOrderPrice(order.promoCode.value)})`
    : "No promo code";
  const hasDiscount = Number(order.promoDiscountAmount) > 0;
  const orderDetailsId = `order-details-${order.id}`;

  const handleCancelOrder = async () => {
    setCancelErrorMessage("");

    try {
      await cancelOrder(order.id).unwrap();
      setIsCancelConfirmOpen(false);
    } catch (error) {
      setIsCancelConfirmOpen(false);
      setCancelErrorMessage(getProfileActionErrorMessage(error));
    }
  };

  const handlePayOrder = async () => {
    try {
      const nextPaymentIntent = await createPaymentIntent(order.id).unwrap();
      setPaymentIntent(nextPaymentIntent);
    } catch (error) {
      setPaymentIntent(null);
      setPaymentNotice({
        type: "error",
        message: `${getProfileActionErrorMessage(error)} Our operator will contact you.`,
      });
    }
  };

  return (
    <article className="border-b border-black/10 py-7">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={orderDetailsId}
        onClick={() => setIsExpanded((previousValue) => !previousValue)}
        className="w-full cursor-pointer text-left"
      >
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
            valueClassName={`text-[#947458] ${order.status === "PAID" && "text-green-700"} ${order.status === "CANCELLED" && "text-red-500"}`}
          />
          <div className="tablet:justify-start mobile:justify-start flex items-center justify-end gap-3">
            <ProfileOrderMeta
              label="Total"
              value={formatProfileOrderPrice(order.totalPrice)}
              className="tablet:text-left mobile:text-left text-right"
            />
            <ArrowDown
              className={`shrink-0 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              stroke="#947458"
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div id={orderDetailsId}>
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
                onClick={handlePayOrder}
                disabled={isCreatePaymentIntentLoading}
                className="cursor-pointer bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatePaymentIntentLoading ? "Preparing..." : "Pay order"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCancelErrorMessage("");
                  setIsCancelConfirmOpen(true);
                }}
                disabled={isCancelLoading}
                className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCancelLoading ? "Cancelling..." : "Cancel order"}
              </button>
              {cancelErrorMessage && (
                <p className="w-full text-right text-sm font-medium text-[#FB5454]">
                  {cancelErrorMessage}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {isCancelConfirmOpen && (
        <ProfileConfirmModal
          title="Cancel this order?"
          description="This will cancel the pending order and return the reserved items to stock."
          confirmText="Cancel order"
          isLoading={isCancelLoading}
          onCancel={() => setIsCancelConfirmOpen(false)}
          onConfirm={handleCancelOrder}
        />
      )}

      {paymentIntent && (
        <ProfileOrderPaymentModal
          orderId={order.id}
          clientSecret={paymentIntent.clientSecret}
          paymentIntentId={paymentIntent.paymentIntentId}
          onClose={() => setPaymentIntent(null)}
          onPaymentConfirmed={() => {
            setPaymentNotice({
              type: "success",
              message: "Payment successful. Our operator will contact you.",
            });
          }}
          onPaymentFailed={(message) => {
            setPaymentNotice({
              type: "error",
              message,
            });
          }}
        />
      )}

      {paymentNotice &&
        typeof document !== "undefined" &&
        createPortal(
          <ProfilePaymentNoticeModal
            paymentNotice={paymentNotice}
            setPaymentNotice={setPaymentNotice}
          />,
          document.body,
        )}
    </article>
  );
};
