import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProducts } from "../../../components/store/products/products-slice";
import { UnitComponent } from "../../../components/reused-components/unit-component";
import { Link } from "react-router-dom";

export const YouMightLike = () => {
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
          You might also like
        </p>
        <div className="mt-8 grid grid-cols-4 gap-5 tablet:gap-4 mobile:grid-cols-2">
          {products.slice(0, 4).map((product) => (
            <UnitComponent
              className=""
              unitImageClassName=""
              unitParamsClassName=""
              key={product.id}
              id={product.id}
              image={`http://localhost:5001/${product.img}`}
              title={product.title}
              cost={product.cost}
            />
          ))}
        </div>
        <div className="mt-9 flex justify-center">
          <Link
            to="/allproducts"
            className="cursor-pointer text-base font-bold transition-colors hover:text-[#2A254B]/70"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};
