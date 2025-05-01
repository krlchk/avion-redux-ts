import { useAppDispatch } from "../../../../app/hooks";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeItemFormCart,
} from "../../../../components/store/products/products-slice";
import { UiButtons } from "../../../../UI";
import { BasketUnitComponent } from "./basket-unit-component";
import { IBasketUnit } from "./types";

export const BasketUnit = ({ id, img, title, cost, amount }: IBasketUnit) => {
  const imageUrl = img;
  const dispatch = useAppDispatch();
  return (
    <div className="text-md mb-20 grid w-full grid-cols-5 px-3 mobile:mb-32 mobile:grid-cols-2">
      <BasketUnitComponent id={id} image={imageUrl} title={title} cost={cost} />
      <p className="font-bold mobile:mt-5 mobile:text-center">
        <span className="hidden mobile:mr-3 mobile:inline">Quantity:</span>
        {amount}
      </p>
      <p className="text-start font-bold mobile:mt-5 mobile:text-center">
        <span className="hidden mobile:mr-3 mobile:inline">Total:</span>
        {amount * cost} $
      </p>
      {amount === 1 ? (
        <div className="flex flex-col items-center justify-center gap-5 mobile:col-span-2 mobile:mt-6">
          <button
            onClick={() => dispatch(increaseCartItemQuantity(id))}
            className="h-10 w-10 rounded-full border border-[#2A254B] font-semibold transition-colors hover:bg-[#2A254B]/20"
          >
            +
          </button>
          <UiButtons
            className="bg-red-400 hover:bg-red-500"
            onClick={() => dispatch(removeItemFormCart(id))}
            size="md"
          >
            Remove item
          </UiButtons>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 mobile:col-span-2 mobile:mt-6">
          <button
            onClick={() => dispatch(increaseCartItemQuantity(id))}
            className="h-10 w-10 rounded-full border border-[#2A254B] font-semibold transition-colors hover:bg-[#2A254B]/20"
          >
            +
          </button>
          <button
            onClick={() => dispatch(decreaseCartItemQuantity(id))}
            className="h-10 w-10 rounded-full border border-[#2A254B] font-semibold transition-colors hover:bg-[#2A254B]/20"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};
