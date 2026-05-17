import { SimpleButtonProps } from "../model/types";

export const SimpleButton = ({ text, onClick }: SimpleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mobile:text-base xs:w-full xs:justify-center flex h-10 cursor-pointer items-center border border-[#947458] px-5 text-xl font-medium text-[#947458] transition-all duration-300 hover:-translate-y-1 hover:bg-[#947458] hover:text-white hover:shadow-lg active:translate-y-0"
    >
      {text}
    </button>
  );
};
