import type { ProfileOrderMetaProps } from "../../model/types";

export const ProfileOrderMeta = ({
  label,
  value,
  className = "",
  valueClassName = "text-black",
}: ProfileOrderMetaProps) => {
  return (
    <div className={className}>
      <p className="tablet:block mobile:block hidden text-xs font-medium tracking-[0.18em] text-black/35 uppercase">
        {label}
      </p>
      <p className={`text-base font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
};
