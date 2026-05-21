import type { CartSummaryProps } from "../model/types";

export const CartSummary = ({
  isCheckoutDisabled,
  isPromoOpen,
  onPromoToggle,
  subtotal,
}: CartSummaryProps) => {
  return (
    <aside className="border border-black/10 bg-[#f5f5f5] p-10">
      <button
        type="button"
        onClick={onPromoToggle}
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
        type="button"
        disabled={isCheckoutDisabled}
        className="mobile:text-base xs:w-full tablet:w-1/3 xs:justify-center mt-5 flex w-full cursor-pointer items-center justify-center border border-black py-2 text-base font-medium tracking-[0.12em] text-black uppercase transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg active:translate-y-0"
      >
        Checkout
      </button>
    </aside>
  );
};
