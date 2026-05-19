import { Container } from "@/shared/ui";
import Link from "next/link";

export const AboutUsShowcase = () => {
  return (
    <Container className="tablet:pb-12 mobile:pb-10 pb-14 text-black">
      <section className="tablet:grid-cols-1 mobile:grid-cols-1 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="tablet:h-150 mobile:h-90 h-180 bg-[url('/images/aboutUs/aboutUsThree.jpg')] bg-cover bg-center" />
          <div className="tablet:h-auto mobile:h-auto mobile:px-6 mobile:py-10 flex h-124 flex-col justify-between gap-8 bg-[#eeedec] px-10 py-14">
            <div className="flex flex-col gap-6">
              <h3 className="mobile:text-3xl mobile:leading-10 text-4xl leading-12 font-bold">
                Furniture That Will Last A Lifetime
              </h3>
              <p className="text-base leading-6.5 font-normal text-black/60">
                We choose pieces with honest materials, strong construction and
                quiet shapes that stay relevant beyond a single season. These
                are designs made for daily rituals, long evenings and homes that
                keep changing with you.
              </p>
            </div>
            <Link
              href={"/products"}
              className="flex w-fit cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="tablet:h-auto mobile:h-auto mobile:order-2 tablet:order-2 mobile:px-6 mobile:py-10 flex h-124 flex-col justify-between gap-8 bg-[#eeedec] px-10 py-14">
            <div className="flex flex-col gap-6">
              <h3 className="mobile:text-3xl mobile:leading-10 text-4xl leading-12 font-bold">
                Live Comfortably Inside Your Home
              </h3>
              <div className="flex flex-col gap-4 text-base leading-6.5 font-normal text-black/60">
                <p>
                  Comfort begins with furniture that supports real life: soft
                  seating, useful surfaces and storage that keeps the room
                  feeling calm.
                </p>
                <p>
                  Our collection is designed to work together naturally, so you
                  can build a home that feels layered, balanced and personal.
                </p>
              </div>
            </div>
            <Link
              href={"/products"}
              className="flex w-fit cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
            >
              Shop now
            </Link>
          </div>
          <div className="tablet:h-150 mobile:h-90 h-180 bg-[url('/images/aboutUs/aboutUsFour.jpg')] bg-cover bg-center" />
        </div>
      </section>
    </Container>
  );
};
