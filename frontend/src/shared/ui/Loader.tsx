import { LoaderProps } from "../model/types";

export const Loader = ({
  styles = "border-[#947458]/20 border-t-[#947458] h-10 w-10 border-4",
}: LoaderProps) => {
  return (
    <div
      className={`animate-spin rounded-full ${styles}`}
      aria-label="Loading"
      role="status"
    />
  );
};
