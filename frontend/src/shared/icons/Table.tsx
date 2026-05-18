import { IconProps } from "@/features/types/api";

export const Table = ({ className, fill = "#947458" }: IconProps) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.6695 0H8.33055L0 10.4283V10.8522V16.7469V16.8779V40H5.16141V16.8779H6.98969V31.9466H11.5059V16.8779H28.4935V31.9466H33.0102V16.8779H34.838V40H40V16.8779V16.7469V10.4273L31.6695 0ZM8.81187 1.86053H31.1875L37.8131 10.1539H2.18625L8.81187 1.86053ZM3.87094 38.1396H1.29055V16.8779H3.87094V38.1396ZM10.2154 30.086H8.28023V16.8779H10.2154V30.086ZM31.7198 30.086H29.7841V16.8779H31.7198V30.086ZM38.7095 38.1396H36.1285V16.8779H38.7095V38.1396ZM38.7095 15.0175H1.29055V11.5496H38.7095V15.0175Z"
        fill={fill}
        stroke={fill}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
