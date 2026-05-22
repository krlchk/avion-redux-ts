import { ProfileFieldProps } from "../model/types";

export const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <div className="mobile:flex-col mobile:items-start flex items-center justify-between gap-6 border-b border-black/10 pb-5">
      <p className="text-sm font-medium tracking-[0.16em] text-black/40 uppercase">
        {label}
      </p>
      <p className="text-lg font-bold text-black">{value}</p>
    </div>
  );
};
