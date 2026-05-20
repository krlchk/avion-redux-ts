import { useSubscribeNewsletterMutation } from "@/store/services/emailApi";
import { useState } from "react";
import { FormSubmitHandler } from "@/shared/model/types";
import { Container, Loader } from "@/shared/ui";

export const TopFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribeNewsletter, { isLoading, isSuccess, isError, reset }] =
    useSubscribeNewsletterMutation();

  const trimmedEmail = email.trim();
  const isSubmitDisabled = isLoading || trimmedEmail.length === 0;

  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();

    if (!trimmedEmail) return;

    try {
      await subscribeNewsletter({ email: trimmedEmail }).unwrap();
      setEmail("");
    } catch {
      console.log("Form Error");
    }
  };

  const handleEmailChange = (value: string) => {
    if (isSuccess || isError) {
      reset();
    }

    setEmail(value);
  };
  return (
    <Container className="mobile:flex-col mobile:items-start flex items-center justify-between gap-12">
      <div className="mobile:w-full w-1/2">
        <p className="mobile:text-xl mobile:leading-7 xs:text-lg xs:leading-6 text-2xl leading-9 font-bold">
          Subscribe to our newsletter <br />
          Don’t miss latest news & promotions
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mobile:w-full w-1/2">
        <div className="xs:flex-col flex gap-2">
          <input
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="mobile:text-lg xs:text-base w-full border border-[#DEE2E6] bg-[#f5f5f5] px-4 py-2 text-xl font-medium text-black outline-[#947458] placeholder:text-[#DEE2E6]"
            type="email"
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="mobile:text-lg xs:w-full xs:px-4 xs:text-base flex items-center justify-center bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-[#f5f5f5] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <Loader styles="h-6 w-6 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        {isSuccess && (
          <p className="mt-2 text-sm font-medium text-[#947458]">
            You are subscribed! Please check your inbox.
          </p>
        )}
        {isError && (
          <p className="mt-2 text-sm font-medium text-[#FB5454]">
            Failed to subscribe. Please try again.
          </p>
        )}
      </form>
    </Container>
  );
};
