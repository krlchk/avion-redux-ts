import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UiButtons } from "../../../UI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchDesigners, fetchProducts, fetchTypes } from "../../../components/store/products/products-slice";

export const Hero = () => {
  const dispatch = useAppDispatch();
  const { status, products } = useAppSelector((state) => state.root.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchDesigners());
      dispatch(fetchTypes());
    }
  }, [dispatch, status]);

  return (
    <section className="container mobile:px-0">
      <div className="flex h-auto w-full">
        <div className="flex w-full bg-[#2A254B] font-DMSans text-4xl font-normal leading-snug text-white">
          <div className="flex w-2/3 flex-col p-16 tablet:w-2/4 tablet:p-12 mobile:w-full mobile:p-8">
            <p className="order-1">
              The furniture brand for the future, with timeless designs
            </p>
            <Link
              className="order-2 mt-10 w-2 mobile:order-3 mobile:w-full"
              to="/allproducts"
            >
              <UiButtons color="lightBlue" size="md" className="mobile:w-full">
                View all
              </UiButtons>
            </Link>
            <p className="order-3 mt-48 text-lg leading-normal tablet:mt-32 mobile:order-2 mobile:mt-20">
              A new era in eco friendly furniture with Avelon, the French luxury
              retail brand with nice fonts, tasteful colors and a beautiful way
              to display things digitally using modern web technologies.
            </p>
          </div>
          <div className="h-full w-2/4 mobile:hidden">
            <img
              className="h-full w-full object-cover"
              src={`http://localhost:5001/${products[2]?.img}`}
              alt={products[2]?.title || "Product Image"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
