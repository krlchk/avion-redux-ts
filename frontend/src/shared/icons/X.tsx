import { IconProps } from "@/entities/types/api";

export const X = ({
  className,
  stroke = "white",
  fill = "white",
}: IconProps) => {
  return (
    <svg
      className={className}
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7533 1.39121L11.5371 1.69203L7.07352 6.26373L6.29475 5.97552L10.7533 1.39121Z"
        fill={fill}
      />
      <path
        d="M4.83029 7.51011L5.63083 7.79359L0.809436 12.7346L0.0135345 12.4641L4.83029 7.51011Z"
        fill={fill}
      />
      <path
        d="M3.43165 2.15976L10.9383 11.8541L8.63401 11.854L1.12247 2.14878L3.43165 2.15976Z"
        stroke={stroke}
      />
    </svg>
  );
};
