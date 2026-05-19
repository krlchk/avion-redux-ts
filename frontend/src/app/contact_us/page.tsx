import { Container } from "@/shared/ui";
import { Location, PhoneContact, Mail } from "@/shared/icons";

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
          <section className="tablet:mt-0 flex items-center">
            <form className="mobile:px-5 mobile:py-8 w-full border border-[#f5f5f5]/55 bg-[#f5f5f5]/95 px-10 py-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <h2 className="mobile:text-3xl text-3xl leading-10 font-bold">
                Get in touch
              </h2>
              <div className="mobile:grid-cols-1 mt-8 grid grid-cols-2 gap-5">
                <label className="flex flex-col gap-2 text-base font-medium">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name..."
                    className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-base font-medium">
                  Phone
                  <input
                    type="number"
                    name="phone"
                    placeholder="Your phone number..."
                    className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
                  />
                </label>
              </div>
              <label className="mt-6 flex flex-col gap-2 text-base font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address..."
                  className="h-12 border border-black/10 px-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
                />
              </label>
              <label className="mt-6 flex flex-col gap-2 text-base font-medium">
                Message
                <textarea
                  name="message"
                  placeholder="Your message..."
                  className="min-h-36 resize-none border border-black/10 px-4 py-4 text-base font-normal transition-colors outline-none placeholder:text-black/35 focus:border-[#947458]"
                />
              </label>
              <button
                type="submit"
                className="mobile:w-full mt-9 flex cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
              >
                Send message
              </button>
            </form>
          </section>
        </Container>
      </div>
    </section>
  );
};

export default ContactUs;
