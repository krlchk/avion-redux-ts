import { Container } from "@/shared/ui";
import { ProductCatalogCard } from "./catalog/ProductCatalogCard";
import { mockFurnitureProducts } from "../model/constants";

export const ProductFeature = () => {
  return (
    <div className="bg-white px-32 tablet:px-0 mobile:px-0">
      <Container className="flex flex-col gap-12 py-28 tablet:py-20 mobile:gap-8 mobile:py-14">
        <div className="flex items-center justify-between gap-4 mobile:flex-col mobile:items-start">
          <p className="text-5xl font-bold text-black tablet:text-4xl mobile:text-3xl xs:text-2xl">
            Featured Products
          </p>
          <button className="flex h-10 items-center border border-[#947458] px-5 text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white mobile:text-base xs:w-full xs:justify-center">
            View All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8">
          {mockFurnitureProducts
            .slice(0, 3)
            .map(({ id, title, price, image, badge }) => (
              <ProductCatalogCard
                key={id}
                id={id}
                badge={badge}
                image={image}
                price={price}
                title={title}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};
