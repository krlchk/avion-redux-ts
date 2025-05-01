import clsx from "clsx";
import { ReactNode } from "react";

type ButtonSize = "md" | "lg";
type ButtonColor = "darkBlue" | "white" | "lightBlue";

interface IUiButtonsProps {
  children: ReactNode | string;
  size?: ButtonSize | string;
  color?: ButtonColor | string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function UiButtons({
  children,
  color = "darkBlue",
  size = "md",
  className = "",
  type = "button",
  onClick,
}: IUiButtonsProps) {
  const buttonClassName = clsx(
    "h-14 text-base text-white justify-center xs:w-[100px] transition-colors flex items-center font-normal text-sm leading-snug",
    className,
    {
      md: "w-[170px]",
      lg: "w-[342px]",
    }[size],
    {
      darkBlue: "bg-[#2A254B] hover:bg-[#2A254B]/80",
      white: "text-blue-800 bg-white transition-colors hover:bg-gray-400",
      lightBlue: "bg-violet-800/30 hover:bg-violet-800/50",
    }[color],
    className,
  );
  return (
    <button className={buttonClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
