import type { ProfileOrderPriceRowProps } from "../../model/types";

export const ProfileOrderPriceRow = ({
  label,
  value,
  isTotal = false,
}: ProfileOrderPriceRowProps) => {
  return (
    <div
      className={`flex items-center justify-between gap-6 ${
        isTotal ? "border-t border-black/10 pt-3 text-lg font-bold" : ""
      }`}
    >
      <p className="text-black/45">{label}</p>
      <p className="text-black">{value}</p>
    </div>
  );
};
