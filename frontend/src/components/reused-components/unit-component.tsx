import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { resetItemCount } from "../store/products/products-slice";

interface IUnitComponent {
  className: string;
  unitImageClassName: string;
  id: number;
  image: string;
  title: string;
  cost: number;
  unitParamsClassName: string;
}

export const UnitComponent = ({
  className,
  unitImageClassName,
  id,
  image,
  title,
  cost,
  unitParamsClassName,
}: IUnitComponent) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(resetItemCount())}
      className={clsx(
        className,
        "cursor-pointer text-xl text-[#2A254B] transition-colors hover:text-[#2A254B]/70",
      )}
    >
      <Link to={`/products/${id}`}>
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
          <p className="mt-2 mobile:text-base">${cost}</p>
        </div>
      </Link>
    </div>
  );
};
