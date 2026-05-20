import { useState } from "react";

import { FormSubmitHandler } from "@/shared/model/types";
import { Loader } from "@/shared/ui";
import { useSendContactMessageMutation } from "@/store/services/emailApi";

import {
  trimContactUsFormValues,
  validateContactUsForm,
} from "../model/constants";
import { ContactUsFormErrors, ContactUsFormValues } from "../model/types";

export const ContactUsForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactUsFormErrors>({});
  const [sendContactMessage, { isLoading, isSuccess, isError, reset }] =
    useSendContactMessageMutation();

  const isSubmitDisabled = isLoading;

  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();

    const data = trimContactUsFormValues({ email, name, phone, message });
    const validationErrors = validateContactUsForm(data);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await sendContactMessage(data).unwrap();
      setEmail("");
      setName("");
      setPhone("");
      setMessage("");
      setErrors({});
    } catch {
      console.log("Form Error");
    }
  };

  const handleFieldChange = (field: keyof ContactUsFormValues, value: string) => {
    if (isSuccess || isError) {
      reset();
    }

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });

    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);
  };

  return (
    <section className="tablet:mt-0 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="mobile:px-5 mobile:py-8 w-full border border-[#f5f5f5]/55 bg-[#f5f5f5]/95 px-10 py-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      >
        <h2 className="mobile:text-3xl text-3xl leading-10 font-bold">
          Get in touch
        </h2>
        <div className="mobile:grid-cols-1 mt-8 grid grid-cols-2 gap-5">
          <label className="flex flex-col gap-2 text-base font-medium">
            Name
            <input
              value={name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              type="text"
              name="name"
              placeholder="Your name..."
              aria-invalid={Boolean(errors.name)}
              className={`h-12 border px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458] ${
                errors.name ? "border-[#FB5454]" : "border-black/10"
              }`}
            />
            {errors.name && (
              <span className="text-sm font-normal text-[#FB5454]">
                {errors.name}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2 text-base font-medium">
            Phone
            <input
              value={phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              type="tel"
              name="phone"
              placeholder="Your phone number..."
              aria-invalid={Boolean(errors.phone)}
              className={`h-12 border px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458] ${
                errors.phone ? "border-[#FB5454]" : "border-black/10"
              }`}
            />
            {errors.phone && (
              <span className="text-sm font-normal text-[#FB5454]">
                {errors.phone}
              </span>
            )}
          </label>
        </div>
        <label className="mt-6 flex flex-col gap-2 text-base font-medium">
          Email
          <input
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            type="email"
            name="email"
            placeholder="Your email address..."
            aria-invalid={Boolean(errors.email)}
            className={`h-12 border px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458] ${
              errors.email ? "border-[#FB5454]" : "border-black/10"
            }`}
          />
          {errors.email && (
            <span className="text-sm font-normal text-[#FB5454]">
              {errors.email}
            </span>
          )}
        </label>
        <label className="mt-6 flex flex-col gap-2 text-base font-medium">
          Message
          <textarea
            value={message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            name="message"
            placeholder="Your message..."
            aria-invalid={Boolean(errors.message)}
            className={`min-h-36 resize-none border px-4 py-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458] ${
              errors.message ? "border-[#FB5454]" : "border-black/10"
            }`}
          />
          {errors.message && (
            <span className="text-sm font-normal text-[#FB5454]">
              {errors.message}
            </span>
          )}
        </label>
        <button
          disabled={isSubmitDisabled}
          type="submit"
          className="mobile:w-full mt-9 flex cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
        >
          {isLoading ? (
            <Loader styles="h-6 w-6 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
          ) : (
            "Send message"
          )}
        </button>
        {isSuccess && (
          <p className="mt-2 text-sm font-medium text-[#947458]">
            Your message has been sent. We will get back to you soon.
          </p>
        )}
        {isError && (
          <p className="mt-2 text-sm font-medium text-[#FB5454]">
            Failed to send message. Please try again.
          </p>
        )}
      </form>
    </section>
  );
};
