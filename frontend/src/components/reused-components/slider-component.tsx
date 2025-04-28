import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { UnitComponent } from "./unit-component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../store/products/products-slice";

export const SliderComponent = () => {
  const dispatch = useAppDispatch();
  const { status, products } = useAppSelector((state) => state.root.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    nextArrow: (
      <NextArrow
        children=">"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        children="<"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <section className="container">
      <div className="flex flex-col font-DMSans font-normal text-[#2A254B]">
        <p className="flex justify-start self-start text-3xl">
          Our popular products
        </p>
        <div className="mt-8 px-10">
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

interface IArrowProps {
  onClick: () => void;
  children: string;
}

const NextArrow = (props: IArrowProps) => {
  const { onClick, children } = props;
  return (
    <div
      className="absolute right-[-50px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2A254B] font-bold text-white transition-colors hover:bg-[#2A254B]/80"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const PrevArrow = (props: IArrowProps) => {
  const { onClick, children } = props;
  return (
    <div
      className="absolute left-[-50px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2A254B] font-bold text-white transition-colors hover:bg-[#2A254B]/80"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
