import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UiButtons } from "../../../UI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProducts } from "../../../components/store/slices";

export function Hero({ className }: { className: string }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.avion);

  useEffect(() => {
    if (state.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, state.status]);

  const navigate = useNavigate();
  const go = () => {
    navigate("/allproducts");
  };

  return (
    <section className={clsx(className, "")}>
      <div className="flex h-auto w-full">
        <div className="flex w-full bg-[#2A254B] font-DMSans text-4xl font-normal leading-snug text-white">
          <div className="flex w-2/3 flex-col p-16 tablet:w-2/4 tablet:p-12 mobile:w-full mobile:p-8">
            <p className="order-1">
              The furniture brand for the future, with timeless designs
            </p>
            <UiButtons
              onClick={go}
              color="lightBlue"
              size="md"
              className="order-2 mt-10 mobile:order-3 mobile:w-full"
            >
              View all
            </UiButtons>
            <p className="order-3 mt-48 text-lg leading-normal tablet:mt-32 mobile:order-2 mobile:mt-20">
              A new era in eco friendly furniture with Avelon, the French luxury
              retail brand with nice fonts, tasteful colors and a beautiful way
              to display things digitally using modern web technologies.
            </p>
          </div>
          <div className="h-full w-2/4 mobile:hidden">
            <img
              className="h-full w-full object-cover"
              src={`http://localhost:5001/${state.products[0]?.img}`}
              alt={state.products[0]?.title || "Product Image"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
