import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { resetItemCount } from "../../../../components/store/products/products-slice";
import { IBusketUnitComponent } from "./types";

export const BasketUnitComponent = ({
  id,
  image,
  title,
  cost,
}: IBusketUnitComponent) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(resetItemCount())}
      className="col-span-2 flex h-[230px] w-full text-xl text-[#2A254B] transition-colors hover:text-[#2A254B]/70 mobile:justify-around"
    >
      <Link to={`/products/${id}`}>
        <div className="h-[190px] w-[140px] cursor-pointer overflow-hidden tablet:h-[140px] mobile:h-[140px]">
          <img className="h-full w-full object-cover" src={image} alt="image" />
        </div>
        <div>
          <p className="mt-5 mobile:text-base">{title}</p>
          <p className="mt-2 mobile:text-base">${cost}</p>
        </div>
      </Link>
    </div>
  );
};
