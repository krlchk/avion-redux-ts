"use client";

import { Logo } from "@/shared/icons/Logo";
import { Container, Loader } from "@/shared/ui";
import Link from "next/link";
import {
  customerLinks,
  deliveryLinks,
  navIconLinks,
  shopLinks,
} from "../model/constants";
import { Payment } from "@/shared/icons";
import { FooterLinksColumnProps, FormSubmitHandler } from "../model/types";
import { useState } from "react";
import { useSubscribeNewsletterMutation } from "@/store/services/emailApi";


export const Footer = () => {
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
    <footer className="mobile:gap-12 flex w-full flex-col gap-20 bg-[#eeedec] pt-14 pb-5 text-black">
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
      <Container className="tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-y-10 xs:grid-cols-1 grid grid-cols-4 gap-10">
        <div className="flex flex-col items-start justify-center gap-5 text-sm font-medium text-black/60">
          <div className="flex gap-2">
            <Logo />
            <h2 className="mobile:text-lg text-xl leading-6 font-bold text-black">
              Avion
            </h2>
          </div>
          <p>60 Fremont Ave. Hamden, CT 06514</p>
          <p>
            <span className="text-black">Email:</span> fStore@email.com
          </p>
          <p>
            <span className="text-black">Phone:</span> (928) 630-9272
          </p>
          <div className="flex gap-3">
            {navIconLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="flex h-6 w-6 items-center justify-start rounded-full bg-black px-2 py-1.5"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterLinksColumn title="Shop" links={shopLinks} />
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterLinksColumn title="Customer service" links={customerLinks} />
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterLinksColumn title="Delivery" links={deliveryLinks} />
        </div>
      </Container>
      <Container className="mobile:flex-col mobile:items-center mobile:gap-5 flex justify-between">
        <p className="text-sm font-medium text-black/60">
          © Copyright Avion 2026.
        </p>
        <Payment />
      </Container>
    </footer>
  );
};

const FooterLinksColumn = ({ title, links }: FooterLinksColumnProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
      <h2 className="mobile:text-lg mb-2 text-xl leading-6 font-bold text-black">
        {title}
      </h2>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} aria-label={label}>
          {label}
        </Link>
      ))}
    </div>
  );
};
