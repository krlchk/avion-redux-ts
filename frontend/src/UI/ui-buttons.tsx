import clsx from "clsx";
/**
 * Description placeholder
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className
 * @param {'md' | 'lg'} props.size
 * @param {'darkBlue' | 'white' | 'lightBlue'} props.color
 * @returns {JSX.Element}
 */

interface IUiButtons {
  type: string;
  children: string;
  color: string;
  size: string;
  className: string;
  onClick: () => void;
}

export function UiButtons({
  children,
  color,
  size,
  className,
  onClick,
}: IUiButtons) {
  const buttonClassName = clsx(
    "h-14 px-8 py-4 text-base text-white justify-center transition-colors flex items-center font-normal text-sm leading-snug",
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
  );
  return (
    <button type="submit" onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
