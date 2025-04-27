import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  decreaseItemCount,
  fetchDesigners,
  fetchProducts,
  fetchTypes,
  increaseItemCount,
} from "../../../components/store/products/products-slice";
import { Link, useParams } from "react-router-dom";
import { UiButtons } from "../../../UI";
import { DimensionList } from "./dimensions-list";

export const AboutProductComponent = () => {
  const dispatch = useAppDispatch();
  const { status, itemCount, products } = useAppSelector(
    (state) => state.root.products,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchDesigners());
      dispatch(fetchTypes());
    }
  }, [dispatch, status]);

  const { id } = useParams();

  const unitComponent = products.find((product) => product.id === Number(id));

  if (!unitComponent) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-2xl text-[#2A254B]">Product not found</p>
      </section>
    );
  }

  return (
    <section>
      {unitComponent && (
        <div className="grid grid-cols-2 font-DMSans font-normal text-[#2A254B] mobile:grid-cols-1">
          <div className="max-h-[760px]">
            <img
              className="h-full w-full object-cover"
              src={`http://localhost:5001/${unitComponent.img}`}
              alt={unitComponent.title || "Product Image"}
            />
          </div>
          <div className="flex flex-col items-center justify-center px-10 py-20">
            <h1 className="self-start text-4xl">{unitComponent.title}</h1>
            <p className="mt-4 self-start text-2xl text-black">
              £ {unitComponent.cost}
            </p>
            <h3 className="mt-14 self-start text-lg font-medium">
              Description
            </h3>
            <p className="mt-4 text-base">{unitComponent.description}</p>
            <h3 className="mt-7 self-start text-lg font-medium">Dimensions</h3>
            <div className="flex self-start">
              <DimensionList
                depth={unitComponent.dimensions.depth}
                height={unitComponent.dimensions.height}
                width={unitComponent.dimensions.width}
              />
            </div>
            <div className="mt-8 flex items-center justify-center self-start">
              <div className="flex flex-col items-center justify-center">
                <h3 className="mr-8 self-start text-base">Amount</h3>
                <div className="mt-8 flex gap-5 self-start text-base">
                  <button
                    disabled={itemCount <= 1}
                    onClick={() => dispatch(decreaseItemCount())}
                    className="h-10 w-10 rounded-full border border-[#2A254B] font-semibold transition-colors hover:bg-[#2A254B]/20"
                  >
                    -
                  </button>
                  <p className="flex items-center justify-center">
                    {itemCount}
                  </p>
                  <button
                    disabled={itemCount >= 10}
                    onClick={() => dispatch(increaseItemCount())}
                    className="h-10 w-10 rounded-full border border-[#2A254B] font-semibold transition-colors hover:bg-[#2A254B]/20"
                  >
                    +
                  </button>
                </div>
                <Link to="/basket-page">
                  <UiButtons
                    //onClick={() => dispatch(addToCart())}
                    color="darkBlue"
                    size="md"
                    className="mt-8 self-start"
                  >
                    Add to cart
                  </UiButtons>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
