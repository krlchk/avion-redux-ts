import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetCart } from "../../../components/store/products/products-slice";
import { UiButtons } from "../../../UI";
import {
  BasketUnit,
  OrderShippingForm,
} from "./main-basket-internal-components";

export const MainBusketComponent = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.root.products);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.choosenProduct.cost * item.amount,
    0,
  );

  return (
    <section className="min-h-[55vw] px-44 py-16 font-DMSans font-normal text-[#2A254B] xs:container tablet:px-20 tablet:py-8">
      <div>
        <h1 className="text-4xl mobile:text-2xl">Your shopping cart</h1>
        <div className="mt-12 flex h-auto w-full flex-col gap-5">
          <div className="text-md grid w-full grid-cols-5 px-3 font-bold mobile:grid-cols-1">
            <p className="col-span-2">Products:</p>
            <p className="mobile:hidden">Quantity:</p>
            <p className="mobile:hidden">Total:</p>
          </div>

          <div>
            {cartItems.length === 0 ? (
              <p className="mt-10 text-center text-xl">Your cart is empty 🛒</p>
            ) : (
              cartItems.map((item) => (
                <BasketUnit
                  key={item.choosenProduct.id}
                  amount={item.amount}
                  cost={item.choosenProduct.cost}
                  id={item.choosenProduct.id}
                  img={item.choosenProduct.img}
                  title={item.choosenProduct.title}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-7 flex text-xl text-[#4E4D93]">
        <h1 className="mr-4">Subtotal:</h1>
        <p className="text-black">${subtotal.toFixed(2)}</p>
      </div>
      <p className="mt-4 text-sm text-[#4E4D93]">
        Taxes and shipping are calculated at checkout
      </p>
      <UiButtons
        className="mt-4"
        onClick={() => dispatch(resetCart())}
        size="md"
        color="lightBlue"
      >
        Clear basket
      </UiButtons>
      <OrderShippingForm />
    </section>
  );
};
