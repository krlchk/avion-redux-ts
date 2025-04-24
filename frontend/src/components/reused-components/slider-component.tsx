import clsx from "clsx";
// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UnitComponent } from "./unit-component";

export function SliderComponent({ className }: { className: string }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
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
    <section className={clsx(className, "")}>
      <div className="flex flex-col font-DMSans font-normal text-[#2A254B]">
        <p className="flex justify-start self-start text-3xl">
          Our popular products
        </p>
        <div className="mt-8">
          <Slider {...settings}>
            {data.slice(0, 11).map((item) => (
              <UnitComponent
                unitImageClassName=""
                unitParamsClassName=""
                className="mx-2"
                id={item.id}
                key={item.id}
                image={`http://localhost:5001/${item.img}`}
                title={item.title}
                cost={item.cost}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
