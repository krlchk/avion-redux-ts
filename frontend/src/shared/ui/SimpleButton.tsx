import { SimpleButtonProps } from "../model/types";

export const SimpleButton = ({ text, onClick, styles }: SimpleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`mobile:text-base xs:w-full ${styles} xs:justify-center flex h-10 cursor-pointer items-center border border-black px-5 text-xl font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg active:translate-y-0`}
    >
      {text}
    </button>
  );
};
