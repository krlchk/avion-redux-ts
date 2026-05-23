import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Loader } from "@/shared/ui";
import { useConfirmOrderPaymentMutation } from "@/store/services/paymentsApi";
import {
  getProfileActionErrorMessage,
  ProfileOrderPaymentFormProps,
  ProfileOrderPaymentModalProps,
} from "../../model/profile.utils";

const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

const ProfileOrderPaymentForm = ({
  orderId,
  paymentIntentId,
  onClose,
  onPaymentConfirmed,
  onPaymentFailed,
}: ProfileOrderPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmOrderPayment, { isLoading: isConfirmPaymentLoading }] =
    useConfirmOrderPaymentMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isStripeSubmitting, setIsStripeSubmitting] = useState(false);

  const isLoading = isStripeSubmitting || isConfirmPaymentLoading;

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Payment form is not ready yet.");
      return;
    }

    setIsStripeSubmitting(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (result.error) {
        onPaymentFailed(
          "Payment was not successful. Our operator will contact you.",
        );
        onClose();
        return;
      }

      const completedPaymentIntentId =
        result.paymentIntent?.id ?? paymentIntentId;

      const response = await confirmOrderPayment({
        orderId,
        paymentIntentId: completedPaymentIntentId,
      }).unwrap();

      onPaymentConfirmed(
        `${response.message}. Payment successful. Our operator will contact you.`,
      );
      onClose();
    } catch (error) {
      onPaymentFailed(
        `${getProfileActionErrorMessage(error)} Our operator will contact you.`,
      );
      onClose();
    } finally {
      setIsStripeSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {errorMessage && (
        <p className="mt-5 text-sm font-medium text-[#FB5454]">
          {errorMessage}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || isLoading}
          className="flex min-w-36 cursor-pointer items-center justify-center bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
          ) : (
            "Pay"
          )}
        </button>
      </div>
    </form>
  );
};

export const ProfileOrderPaymentModal = ({
  clientSecret,
  orderId,
  paymentIntentId,
  onClose,
  onPaymentConfirmed,
  onPaymentFailed,
}: ProfileOrderPaymentModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-payment-title"
    >
      <div className="mobile:p-6 w-full max-w-lg border border-[#f5f5f5]/35 bg-[#f5f5f5] p-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <p id="profile-payment-title" className="text-2xl leading-8 font-bold">
          Complete payment
        </p>
        <p className="mt-4 text-base leading-7 font-medium text-black/55">
          Enter your payment details to finish this order.
        </p>

        <div className="mt-7">
          {stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <ProfileOrderPaymentForm
                orderId={orderId}
                paymentIntentId={paymentIntentId}
                onClose={onClose}
                onPaymentConfirmed={onPaymentConfirmed}
                onPaymentFailed={onPaymentFailed}
              />
            </Elements>
          ) : (
            <p className="text-sm font-medium text-[#FB5454]">
              Stripe publishable key is missing.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
