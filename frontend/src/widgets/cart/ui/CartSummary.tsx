import { useState } from "react";

import { Loader } from "@/shared/ui";
import { useCreateOrderMutation } from "@/store/services/ordersApi";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { getCreateOrderErrorMessage } from "../model/cart.utils";
import type { CartSummaryProps } from "../model/types";

export const CartSummary = ({
  isCheckoutDisabled,
  isPromoOpen,
  onPromoToggle,
  subtotal,
  checkoutProducts,
}: CartSummaryProps) => {
  const dispatch = useAppDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [createOrder, { isLoading, isSuccess, reset }] =
    useCreateOrderMutation();

  const handleCheckout = async () => {
    setOrderMessage("");

    if (checkoutProducts.length === 0) {
      setOrderMessage("Your cart is empty.");
      return;
    }

    try {
      await createOrder({
        items: checkoutProducts,
        promoCode: promoCode.trim() || undefined,
      }).unwrap();
      dispatch(clearCart());
      setPromoCode("");
    } catch (error) {
      setOrderMessage(getCreateOrderErrorMessage(error));
    }
  };

  return (
    <aside className="border border-black/10 bg-[#f5f5f5] p-10">
      <button
        type="button"
        onClick={() => {
          onPromoToggle();
          reset();
          setOrderMessage("");
        }}
        className="flex w-full cursor-pointer items-center justify-between border-b border-black/10 pb-8 text-left text-base font-medium tracking-[0.08em] uppercase"
      >
        Promo code
        <span className="text-3xl leading-none font-light">
          {isPromoOpen ? "-" : "+"}
        </span>
      </button>

      <div
        className={`grid overflow-hidden border-b border-black/10 transition-all duration-500 ease-out ${
          isPromoOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div
            className={`mobile:flex-col flex py-6 transition-all duration-500 ease-out ${
              isPromoOpen ? "translate-y-0" : "-translate-y-3"
            }`}
          >
            <input
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                reset();
                setOrderMessage("");
              }}
              placeholder="Promo code"
              className="mobile:w-full h-14 flex-1 border border-black/40 bg-[#f5f5f5] px-5 text-lg font-medium tracking-[0.08em] text-black transition-colors outline-none placeholder:text-black/40 focus:border-[#947458]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-black/10 py-8">
        <p className="text-base font-medium tracking-[0.08em] uppercase">
          Subtotal
        </p>
        <p className="text-lg font-medium">{subtotal}</p>
      </div>
      <div className="flex items-center justify-between border-b border-black/10 py-8">
        <p className="text-base font-medium tracking-[0.08em] uppercase">
          Total
        </p>
        <p className="text-xl font-medium">{subtotal}</p>
      </div>
      <button
        onClick={handleCheckout}
        type="button"
        disabled={isCheckoutDisabled || isLoading}
        className="mobile:text-base xs:w-full tablet:w-1/3 xs:justify-center mt-5 flex min-h-10 w-full cursor-pointer items-center justify-center border border-black py-2 text-base font-medium tracking-[0.12em] text-black uppercase transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-black disabled:hover:text-black disabled:hover:shadow-none"
      >
        {isLoading ? (
          <Loader styles="h-5 w-5 border-2 border-black/20 border-t-black" />
        ) : (
          "Checkout"
        )}
      </button>
      {isSuccess && (
        <p className="mt-4 text-sm font-medium text-[#947458]">
          Order created successfully.
        </p>
      )}
      {orderMessage && (
        <p className="mt-4 text-sm font-medium text-[#FB5454]">
          {orderMessage}
        </p>
      )}
    </aside>
  );
};
