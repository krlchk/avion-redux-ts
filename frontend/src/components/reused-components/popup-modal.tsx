import clsx from "clsx";
import { useEffect } from "react";
import { IconOne, IconTwo } from "./icons/popup-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hidePopup, showPopup } from "../store/ui/ui-slice";

export const PopUpModal = () => {
  const dispatch = useAppDispatch();
  const { isPopUpOpen } = useAppSelector((state) => state.root.ui);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showPopup());
    }, 1000000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      className={clsx(
        "fixed top-0 z-[1] mx-auto flex w-full max-w-[1700px] bg-[#2A254B] px-3 py-4 text-white transition-all duration-500",
        isPopUpOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex w-full items-center justify-center gap-2">
        <IconOne />
        <p>Free delivery on all orders over £50 with code easter checkout</p>
      </div>
      <button className="ml-auto" onClick={() => dispatch(hidePopup())}>
        <IconTwo />
      </button>
    </div>
  );
};
