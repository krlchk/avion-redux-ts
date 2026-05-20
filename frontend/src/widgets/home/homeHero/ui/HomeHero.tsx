import { Container, Loader } from "@/shared/ui";
import { HomeHeroProductCard } from "./HomeHeroProductCard";
import { HomeHeroProps } from "../model/types";
import Link from "next/link";

export const HomeHero = ({
  heroProducts,
  isHeroProductsLoading,
  isHeroProductsError,
}: HomeHeroProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -inset-6 animate-[hero-zoom_18s_ease-in-out_infinite] bg-[url('/images/home/heroHero.jpg')] bg-cover bg-center will-change-transform" />
      <Container className="tablet:grid-cols-1 tablet:gap-16 tablet:py-24 mobile:grid-cols-1 mobile:gap-12 mobile:py-16 relative z-10 grid grid-cols-2 gap-32 py-36 text-[#f5f5f5]">
        <section className="mobile:p-6 flex max-w-175 flex-col gap-8 border border-[#f5f5f5]/20 bg-black/28 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm">
          <div className="mobile:text-sm w-fit border border-[#f5f5f5]/15 px-4 py-3 text-base font-bold shadow-sm">
            Furniture
          </div>
          <h1 className="tablet:max-w-190 tablet:text-6xl tablet:leading-17 mobile:max-w-160 mobile:text-5xl mobile:leading-14 xs:text-4xl xs:leading-11 text-7xl leading-20 font-bold">
            Where Traditional Meets Modern
          </h1>
          <p className="tablet:max-w-150 mobile:max-w-130 mobile:text-sm mobile:leading-6 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/88">
            Discover furniture made for modern living, where clean design meets
            everyday comfort and lasting quality.
          </p>
          <div className="mobile:text-base xs:flex-col mt-4 flex gap-3 text-lg font-bold">
            <Link
              href={"/products"}
              className="xs:w-full flex w-1/2 cursor-pointer items-center justify-center bg-[#947458] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
            >
              Shop now
            </Link>
            <Link
              className="xs:w-full flex w-1/2 cursor-pointer items-center justify-center border border-[#f5f5f5]/80 p-6 text-[#f5f5f5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5]/10 hover:shadow-lg active:translate-y-0"
              href={"/about_us"}
            >
              Learn more
            </Link>
          </div>
        </section>
        <section className="mobile:gap-4 xs:grid-cols-1 grid grid-cols-2 justify-center gap-6">
          {isHeroProductsLoading ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center">
              <Loader styles="h-12 w-12 border-4 border-[#f5f5f5]/25 border-t-[#f5f5f5]" />
            </div>
          ) : isHeroProductsError ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
              Failed to load products
            </div>
          ) : heroProducts.length === 0 ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-[#f5f5f5]/80">
              No products yet
            </div>
          ) : (
            heroProducts.map(({ id, title, price, img, stock }) => (
              <HomeHeroProductCard
                id={id}
                key={id}
                title={title}
                price={price}
                img={img}
                stock={stock}
              />
            ))
          )}
        </section>
      </Container>
    </div>
  );
};
