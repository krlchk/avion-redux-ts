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
    <div className="bg-[url('/images/home/heroImage.jpg')] bg-cover bg-center">
      <Container className="tablet:grid-cols-1 tablet:gap-16 tablet:py-24 mobile:grid-cols-1 mobile:gap-12 mobile:py-16 grid grid-cols-2 gap-32 py-36 text-white">
        <section className="mobile:gap-7 flex flex-col gap-10">
          <div className="mobile:text-sm w-fit bg-white/10 px-4 py-3 text-base font-bold">
            Furniture
          </div>
          <h1 className="tablet:max-w-190 tablet:text-6xl tablet:leading-17 mobile:max-w-160 mobile:text-5xl mobile:leading-14 xs:text-4xl xs:leading-11 text-7xl leading-20 font-bold">
            Where Traditional Meets Modern
          </h1>
          <p className="tablet:max-w-150 mobile:max-w-130 mobile:text-sm mobile:leading-6 text-base leading-7 font-normal text-white/80">
            Discover furniture made for modern living, where clean design meets
            everyday comfort and lasting quality.
          </p>
          <div className="mobile:mt-4 mobile:text-base xs:flex-col mt-10 flex gap-3 text-lg font-bold">
            <Link
              href={"/products"}
              className="xs:w-full flex w-1/2 cursor-pointer items-center justify-center bg-[#947458] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
            >
              Shop now
            </Link>
            <Link
              className="xs:w-full flex w-1/2 cursor-pointer items-center justify-center border border-white/80 p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg active:translate-y-0"
              href={""}
            >
              Learn more
            </Link>
          </div>
        </section>
        <section className="mobile:gap-4 xs:grid-cols-1 grid grid-cols-2 justify-center gap-6">
          {isHeroProductsLoading ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center">
              <Loader styles="h-12 w-12 border-4 border-white/25 border-t-white" />
            </div>
          ) : isHeroProductsError ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
              Failed to load products
            </div>
          ) : heroProducts.length === 0 ? (
            <div className="xs:col-span-1 mobile:min-h-80 col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-white/80">
              No products yet
            </div>
          ) : (
            heroProducts.map(({ id, title, price, img, stock }) => (
              <HomeHeroProductCard
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
