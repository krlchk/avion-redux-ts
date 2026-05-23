import { Loader } from "@/shared/ui";
import type { CartStatusMessageProps } from "../model/types";

export const CartStatusMessage = ({
  isEmpty,
  isError,
  isLoading,
}: CartStatusMessageProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-60 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
        Failed to load cart
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-60 items-center justify-center text-center text-base font-medium text-black/40">
        Your cart is empty
      </div>
    );
  }

  return null;
};
