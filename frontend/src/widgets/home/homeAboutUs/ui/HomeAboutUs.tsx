import Link from "next/link";

export const HomeAboutUs = () => {
  return (
    <div className="tablet:flex-col mobile:flex-col flex w-full">
      <div className="tablet:w-full tablet:min-h-150 mobile:w-full mobile:min-h-125 flex w-1/2 flex-col items-center justify-center overflow-hidden bg-[url('/images/home/heroFourth.jpg')] bg-cover bg-center text-center">
        <div className="mobile:mx-4 mobile:p-6 flex w-full max-w-140 flex-col items-center border border-white/20 bg-black/30 p-8 text-white backdrop-blur-sm">
          <p className="mobile:text-sm mobile:leading-6 text-base leading-7 text-white/90">
            Create a home that feels calm, considered, and truly yours. Avion
            brings together timeless silhouettes, comfortable materials, and
            thoughtful details for everyday living.
          </p>
          <Link
            className="mobile:mt-6 mobile:w-full mt-8 flex w-1/2 cursor-pointer items-center justify-center border border-white/80 p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg active:translate-y-0"
            href={""}
          >
            Learn more about us
          </Link>
        </div>
      </div>
      <section className="tablet:w-full tablet:px-16 tablet:py-28 mobile:w-full mobile:gap-8 mobile:px-6 mobile:py-16 flex w-1/2 flex-col gap-16 bg-[#F6F4F2] px-32 py-52 text-black">
        <h2 className="mobile:text-3xl mobile:leading-10 text-4xl leading-13 font-bold">
          Affordable furniture for every home
        </h2>
        <p className="text-base leading-6.5 font-normal text-black/70">
          We curate pieces that balance price, durability, and style, making it
          easier to furnish every room without compromising on comfort or
          character.
        </p>
      </section>
    </div>
  );
};
