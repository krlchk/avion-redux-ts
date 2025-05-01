import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { loadStripe } from "@stripe/stripe-js";
import {
  createCheckoutSession,
  createOrder,
  resetCart,
} from "../../../../components/store/products/products-slice";
import { sendEmailConfirmOrder } from "../../../../components/store/user/user-slice";
import { UiButtons } from "../../../../UI";
const stripe = loadStripe(
  "pk_test_51QK21ZHPoO0w218hgamF58nkDBa3gqiTstf3s6YNlYNX6hDVrW9uhjzMH1QqEW2sa9Rf6TkIweC1fkOBWxuO7N4J00vcmSudOX",
);

export const OrderShippingForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.root.user.user);
  const { cartItems } = useAppSelector((state) => state.root.products);

  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(0);
  const [adress, setAdress] = useState("");
  const [comment, setComment] = useState("");

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
    dispatch(sendEmailConfirmOrder({ name: user?.name, email: user?.email }));
    dispatch(
      createOrder({
        name: user?.name,
        surname: surname,
        email: user?.email,
        phone: phone,
        address: adress,
        comment: comment,
        items: cartItems,
      }),
    );
    dispatch(resetCart());
  };

  return (
    <div className="mt-16 w-2/3 tablet:w-2/3 mobile:w-full">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="mb-7 w-full text-2xl font-bold">Checkout Form</h1>
        <h1 className="mb-2">Name:</h1>
        <input
          readOnly
          required
          value={user?.name}
          placeholder="name..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          type="text"
        />
        <h1 className="mb-2">Surname:</h1>
        <input
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          placeholder="surname..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          type="text"
        />
        <h1 className="mb-2">Email:</h1>
        <input
          readOnly
          required
          value={user?.email}
          placeholder="email..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          type="email"
        />
        <h1 className="mb-2">Number:</h1>
        <input
          onChange={(e) => {
            setPhone(Number(e.target.value));
          }}
          placeholder="number..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          type="number"
        />
        <h1 className="mb-2">Shipping adress:</h1>
        <input
          onChange={(e) => {
            setAdress(e.target.value);
          }}
          placeholder="adress..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
          type="text"
        />
        <h1 className="mb-2">Comment:</h1>
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
          rows={5}
          placeholder="message..."
          className="mb-5 w-3/4 rounded-md border border-[#2A254B] p-2 mobile:w-full xs:w-full"
        />
        <UiButtons type="submit" className="mt-4" size="md" color="darkBlue">
          Go to pay
        </UiButtons>
      </form>
    </div>
  );
};
