"use client";

import { Container } from "@/shared/ui";
import { Location, PhoneContact, Mail } from "@/shared/icons";
import { ContactUsForm } from "@/widgets/contactUs/ContactUsForm/ui/ContactUsForm";

const ContactUs = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="w-full bg-[url('/images/contactUs/contactUs.jpg')] bg-cover bg-center py-30">
        <Container className="tablet:grid-cols-1 tablet:gap-12 tablet:px-10 mobile:grid-cols-1 mobile:gap-10 mobile:px-5 mobile:py-10 grid grid-cols-2 gap-12 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <section className="mobile:py-0 flex flex-col py-10">
            <p className="mobile:text-4xl mobile:leading-12 text-5xl leading-16.25 font-bold">
              Contact Us
            </p>
            <p className="mt-7 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/82">
              Have a question about an order, delivery, materials or choosing
              the right piece for your home? Send us a message and our team will
              help you find the best next step.
            </p>
            <div className="mobile:mt-12 mobile:items-start mt-20 flex items-center gap-5">
              <Location className="shrink-0" stroke="#f5f5f5" />
              <div className="flex flex-col gap-2">
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold text-[#f5f5f5]/62">
                  Physical address
                </p>
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold text-[#f5f5f5]">
                  60 Fremont Ave. Hamden, CT 06514
                </p>
              </div>
            </div>
            <div className="mobile:mt-12 mobile:items-start mt-20 flex items-center gap-5">
              <PhoneContact className="shrink-0" stroke="#f5f5f5" />
              <div className="flex flex-col gap-2">
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold text-[#f5f5f5]/62">
                  Phone number
                </p>
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold text-[#f5f5f5]">
                  + (437) - 402 - 2459
                </p>
              </div>
            </div>
            <div className="mobile:mt-12 mobile:items-start mt-20 flex items-center gap-5">
              <Mail className="shrink-0" stroke="#f5f5f5" />
              <div className="flex flex-col gap-2">
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold text-[#f5f5f5]/62">
                  Email address
                </p>
                <p className="mobile:text-xl text-2xl leading-7.75 font-bold break-all text-[#f5f5f5]">
                  avion.furniture.depot@gmail.com
                </p>
              </div>
            </div>
          </section>
          <ContactUsForm />
        </Container>
      </div>
    </section>
  );
};

export default ContactUs;







