import { useEffect } from "react";
import { UnitComponent } from "../../../components/reused-components/unit-component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProducts,
  loadMoreProducts,
} from "../../../components/store/products/products-slice";

export const ProductsCatalogComponent = () => {
  const dispatch = useAppDispatch();
  const { loadedProducts, isLoadMore, status } = useAppSelector(
    (state) => state.root.products,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="col-span-3 grid mobile:col-span-2 xs:mt-10">
      <div className="grid grid-cols-3 gap-5 mobile:grid-cols-1 mobile:gap-0">
        {loadedProducts.map((product) => (
          <UnitComponent
            unitImageClassName=""
            unitParamsClassName=""
            className="mx-2 mobile:mt-3"
            id={product.id}
            key={product.id}
            image={product.img}
            title={product.title}
            cost={product.cost}
          />
        ))}
      </div>
      {isLoadMore && (
        <button
          onClick={() => {
            dispatch(loadMoreProducts());
          }}
          className="mt-10 px-8 py-4 font-DMSans text-base font-normal text-[#2A254B] transition-colors hover:text-[#2A254B]/70"
        >
          Load more
        </button>
      )}
    </div>
  );
};
