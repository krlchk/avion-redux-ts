import { Container } from "@/shared/ui";
import Link from "next/link";

export const AboutUsLiveComfortably = () => {
  return (
    <div className="w-full bg-[#eeedec]">
      <Container className="tablet:flex-col tablet:items-start tablet:gap-10 tablet:py-18 mobile:flex-col mobile:items-start mobile:gap-8 mobile:py-14 flex w-full items-center justify-between gap-12 py-24 text-black">
        <div className="tablet:w-full mobile:w-full flex w-2/3 max-w-3xl flex-col gap-4">
          <h2 className="tablet:text-4xl tablet:leading-12 mobile:text-3xl mobile:leading-10 text-5xl leading-16.25 font-bold">
            Live comfortably inside your home
          </h2>
          <p className="max-w-2xl text-base leading-7 font-normal text-black/60">
            Create a space that feels calm from morning to night with furniture
            chosen for soft textures, balanced proportions and everyday
            durability.
          </p>
        </div>
        <Link
          href={"/products"}
          className="mobile:w-full mobile:max-w-80 flex max-h-12 shrink-0 cursor-pointer items-center justify-center bg-[#947458] px-10 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
        >
          Shop now
        </Link>
      </Container>
    </div>
  );
};
