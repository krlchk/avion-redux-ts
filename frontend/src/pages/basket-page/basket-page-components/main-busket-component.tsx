import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  createCheckoutSession,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeItemFormCart,
  resetCart,
} from "../../../components/store/products/products-slice";
import { sendEmailConfirmOrder } from "../../../components/store/user/user-slice";
import { UiButtons } from "../../../UI";
import { BasketUnitComponent } from "./basket-unit-component";

import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(
  "pk_test_51QK21ZHPoO0w218hgamF58nkDBa3gqiTstf3s6YNlYNX6hDVrW9uhjzMH1QqEW2sa9Rf6TkIweC1fkOBWxuO7N4J00vcmSudOX",
);

export const MainBusketComponent = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.root.products);
  const { cartItems } = useAppSelector((state) => state.root.products);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.choosenProduct.cost * item.amount,
    0,
  );

  const handlePayment = async () => {
    try {
      const stripeInstance = await stripe;
      if (!stripeInstance) {
        console.error("Stripe failed to load");
        return;
      }

      const resultAction = await dispatch(createCheckoutSession(cartItems));
      if (createCheckoutSession.fulfilled.match(resultAction)) {
        const { url } = resultAction.payload;
        window.location.href = url;
      } else {
        console.error(
          "Failed to create checkout session:",
          resultAction.payload,
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handlePayment();
    dispatch(sendEmailConfirmOrder({ name: name, email: email }));
    dispatch(resetCart());
  };

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

      <div className="mt-16 w-2/3 tablet:w-2/3 mobile:w-full">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="mb-7 w-full text-2xl font-bold">Checkout Form</h1>
          <h1 className="mb-2">Name:</h1>
          <input
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="name..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
            type="text"
          />
          <h1 className="mb-2">Surname:</h1>
          <input
            placeholder="surname..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
            type="text"
          />
          <h1 className="mb-2">Email:</h1>
          <input
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
            type="email"
          />
          <h1 className="mb-2">Number:</h1>
          <input
            placeholder="number..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
            type="number"
          />
          <h1 className="mb-2">Shippeng adress:</h1>
          <input
            placeholder="product name..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
            type="text"
          />
          <h1 className="mb-2">Comment:</h1>
          <textarea
            rows={5}
            placeholder="product name..."
            className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          />
          <UiButtons type="submit" className="mt-4" size="md" color="darkBlue">
            Go to pay
          </UiButtons>
        </form>
      </div>
    </section>
  );
};

const BasketUnit = ({
  id,
  img,
  title,
  cost,
  amount,
}: {
  id: number;
  img: string;
  title: string;
  cost: number;
  amount: number;
}) => {
  const imageUrl = `http://localhost:5001/${img}`;
  const dispatch = useAppDispatch();
  //const state = useAppSelector((state) => state.root.products);
  return (
    <div className="text-md mb-10 grid w-full grid-cols-5 px-3 mobile:mb-32 mobile:grid-cols-2">
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
