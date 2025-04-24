import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface IUnitComponent {
  className: string;
  unitImageClassName: string;
  id: number;
  image: string;
  title: string;
  cost: number;
  unitParamsClassName: string;
}

export function UnitComponent({
  className,
  unitImageClassName,
  id,
  image,
  title,
  cost,
  unitParamsClassName,
}: IUnitComponent) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        className,
        "cursor-pointer text-xl text-[#2A254B] transition-colors hover:text-[#2A254B]/70",
      )}
    >
      <div
        className={clsx(
          "h-[400px] w-full overflow-hidden tablet:h-[350px] mobile:h-[300px]",
          unitImageClassName,
        )}
      >
        <img className="h-full w-full object-cover" src={image} alt="image" />
      </div>
      <div>
        <p className={clsx(unitParamsClassName, "mt-6 mobile:text-base")}>
          {title}
        </p>
        <p className="mt-2 mobile:text-base">£{cost}</p>
      </div>
    </div>
  );
}
