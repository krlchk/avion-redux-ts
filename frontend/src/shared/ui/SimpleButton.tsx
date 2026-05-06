import { SimpleButtonProps } from "../model/types";

export const SimpleButton = ({ text }: SimpleButtonProps) => {
  return (
    <button className="mobile:text-base xs:w-full xs:justify-center flex h-10 items-center border border-[#947458] px-5 text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white">
      {text}
    </button>
  );
};
