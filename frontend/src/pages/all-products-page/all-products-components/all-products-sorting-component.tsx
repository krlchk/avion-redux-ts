import { FormEvent, useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchDesigners,
  fetchTypes,
  filterProducts,
  toggleDesignerSelection,
  togglePriceSelection,
  toggleTypeSelection,
  updateSearchName,
} from "../../../components/store/products/products-slice";
import { getOptionLabel } from "../../../hooks";
import { priceOptions } from "../../../components/reused-components/CONSTANTS/constants";
import { showProductModal } from "../../../components/store/ui/ui-slice";

export const SortingComponent = () => {
  const { isAddProductModalOpen } = useAppSelector((state) => state.root.ui);

  const dispatch = useAppDispatch();
  const {
    status,
    types,
    designers,
    selectedTypes,
    selectedDesigners,
    selectedPrices,
  } = useAppSelector((state) => state.root.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDesigners());
      dispatch(fetchTypes());
    }
  }, [dispatch, status]);

  const categories = useMemo(
    () => [
      {
        title: "Type",
        options: types.map((type) => type),
      },
      {
        title: "Price",
        options: priceOptions,
      },
      {
        title: "Designer",
        options: designers.map((designer) => designer),
      },
    ],
    [designers, types],
  );

  const handleCheckBoxChange = useCallback(
    (categoryTitle: string, id: number) => {
      if (categoryTitle === "Type") {
        dispatch(toggleTypeSelection(id));
      } else if (categoryTitle === "Designer") {
        dispatch(toggleDesignerSelection(id));
      } else if (categoryTitle === "Price") {
        dispatch(togglePriceSelection(id));
      }
      dispatch(filterProducts());
    },
    [dispatch],
  );

  const isChecked = (categoryTitle: string, id: number) => {
    if (categoryTitle === "Type") return selectedTypes.includes(id);
    if (categoryTitle === "Designer") return selectedDesigners.includes(id);
    if (categoryTitle === "Price") return selectedPrices.includes(id);
    return false;
  };

  const handleOpenModal = (e: FormEvent) => {
    e.preventDefault();
    dispatch(showProductModal());
  };

  useEffect(() => {
    if (isAddProductModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddProductModalOpen]);

  return (
    <div className="grid mobile:col-span-2">
      <form className="font-DMSans text-base font-normal text-[#2A254B]">
        <button
          onClick={(e) => handleOpenModal(e)}
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 transition-colors hover:bg-[#2A254B] hover:text-white xs:w-full"
        >
          Add new product
        </button>
        <h1 className="mb-3">Find by title:</h1>
        <input
          onChange={(e) => {
            dispatch(updateSearchName(e.target.value));
            dispatch(filterProducts());
          }}
          placeholder="product name..."
          className="mb-10 w-3/4 rounded-md border border-[#2A254B] p-2 xs:w-full"
          type="text"
        />
        {categories.map((category) => (
          <div key={category.title} className="mb-12 last:mb-0">
            <h1 className="mb-5">{category.title} </h1>
            {category.options.map((option) => {
              return (
                <div key={option.id} className="mb-3">
                  <input
                    className="mr-4 cursor-pointer"
                    id={option.id.toString()}
                    type="checkbox"
                    checked={isChecked(category.title, option.id)}
                    onChange={() =>
                      handleCheckBoxChange(category.title, option.id)
                    }
                  />
                  <label htmlFor={option.id.toString()}>
                    {getOptionLabel(option)}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </form>
    </div>
  );
};
