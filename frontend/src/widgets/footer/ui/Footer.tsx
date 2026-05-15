import { Logo } from "@/shared/icons/Logo";
import { Container } from "@/shared/ui";
import Link from "next/link";
import {
  customerLinks,
  deliveryLinks,
  navIconLinks,
  shopLinks,
} from "../model/constants";
import { Payment } from "@/shared/icons";
import { FooterLinksColumnProps } from "../model/types";



export const Footer = () => {
  return (
    <footer className="mobile:gap-12 flex w-full flex-col gap-20 bg-[#F6F4F2] pt-14 pb-5 text-black">
      <Container className="mobile:flex-col mobile:items-start flex items-center justify-between gap-12">
        <div className="mobile:w-full w-1/2">
          <p className="mobile:text-xl mobile:leading-7 xs:text-lg xs:leading-6 text-2xl leading-9 font-bold">
            Subscribe to our newsletter <br />
            Don’t miss latest news & promotions
          </p>
        </div>
        <form className="mobile:w-full xs:flex-col flex w-1/2 gap-2">
          <input
            className="mobile:text-lg xs:text-base w-full border border-[#DEE2E6] bg-white px-4 py-2 text-xl font-medium text-black placeholder:text-[#DEE2E6]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="mobile:text-lg xs:w-full xs:px-4 xs:text-base bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-white">
            Subscribe
          </button>
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
