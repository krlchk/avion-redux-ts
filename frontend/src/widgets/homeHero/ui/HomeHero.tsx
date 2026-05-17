import { Container, Loader } from "@/shared/ui";
import { HomeHeroProductCard } from "./HomeHeroProductCard";
import { HomeHeroProps } from "../model/types";

export const HomeHero = ({
  heroProducts,
  isHeroProductsLoading,
  isHeroProductsError,
}: HomeHeroProps) => {
  return (
    <div className="bg-[url('/images/home/albero-furniture-bratislava-MfhmKuuQOBk-unsplash.jpg')] bg-cover bg-center">
      <Container className="grid grid-cols-2 gap-32 py-36 text-white">
        <section className="flex flex-col gap-10">
          <div className="w-fit bg-white/10 px-4 py-3 text-base font-bold">
            Furniture
          </div>
          <h1 className="text-7xl leading-20 font-bold">
            Where Traditional Meets Modern
          </h1>
          <p className="text-base leading-7 font-normal">
            Mi tristique est nunc sapien orci tortor ac. Suspendisse leo et
            cursus pharetra tellus tincidunt.
          </p>
          <div className="mt-10 flex gap-3 text-lg font-bold">
            <button className="w-1/2 cursor-pointer bg-[#947458] py-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0">
              Shop now
            </button>
            <button className="w-1/2 cursor-pointer border border-white/80 py-6 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg active:translate-y-0">
              Learn more
            </button>
          </div>
        </section>
        <section className="grid grid-cols-2 justify-center gap-6">
          {isHeroProductsLoading ? (
            <div className="col-span-2 flex min-h-110 items-center justify-center">
              <Loader styles="h-12 w-12 border-4 border-white/25 border-t-white" />
            </div>
          ) : isHeroProductsError ? (
            <div className="col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
              Failed to load products
            </div>
          ) : heroProducts.length === 0 ? (
            <div className="col-span-2 flex min-h-110 items-center justify-center text-center text-sm font-medium text-white/80">
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
