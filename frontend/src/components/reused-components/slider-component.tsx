import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { UnitComponent } from "./unit-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../store/products/products-slice";
import { settings } from "./CONSTANTS/constants";

export const SliderComponent = () => {
  const dispatch = useAppDispatch();
  const { status, products } = useAppSelector((state) => state.root.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <section className="container">
      <div className="flex flex-col font-DMSans font-normal text-[#2A254B]">
        <p className="flex justify-start self-start text-3xl">
          Our popular products
        </p>
        <div className="mt-8">
          <Slider {...settings}>
            {products.slice(0, 11).map((product) => (
              <UnitComponent
                unitImageClassName=""
                unitParamsClassName=""
                className="mx-2"
                id={product.id}
                key={product.id}
                image={`http://localhost:5001/${product.img}`}
                title={product.title}
                cost={product.cost}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
