import { useEffect } from "react";
import { ProfilePaymentNoticeModalProps } from "../../model/types";

export const ProfilePaymentNoticeModal = ({
  paymentNotice,
  setPaymentNotice,
}: ProfilePaymentNoticeModalProps) => {
  useEffect(() => {
    if (!paymentNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPaymentNotice(null);
    }, 6000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentNotice]);
  return (
    <div className="fixed top-6 right-6 z-9999 max-w-sm animate-[fadeIn_0.2s_ease-out]">
      <div
        className={`border px-6 py-5 text-sm font-bold tracking-[0.08em] uppercase shadow-[0_24px_80px_rgba(0,0,0,0.18)] ${
          paymentNotice.type === "success"
            ? "border-[#947458]/25 bg-[#f5f5f5] text-[#947458]"
            : "border-[#FB5454]/25 bg-[#f5f5f5] text-[#FB5454]"
        }`}
      >
        <div className="flex items-start gap-4">
          <p className="leading-6">{paymentNotice.message}</p>
          <button
            type="button"
            onClick={() => setPaymentNotice(null)}
            className="cursor-pointer text-lg leading-none text-black/35 transition-colors hover:text-black"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
