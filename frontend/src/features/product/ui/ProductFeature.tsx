import { Container, SimpleButton } from "@/shared/ui";
import { ProductCatalogCard } from "./catalog/ProductCatalogCard";
import { mockFurnitureProducts } from "../model/constants";

export const ProductFeature = () => {
  return (
    <div className="tablet:px-0 mobile:px-0 bg-white px-32">
      <Container className="tablet:py-20 mobile:gap-8 mobile:py-14 flex flex-col gap-12 py-28">
        <div className="mobile:flex-col mobile:items-start flex items-center justify-between gap-4">
          <p className="tablet:text-4xl mobile:text-3xl xs:text-2xl text-5xl font-bold text-black">
            Featured Products
          </p>
          <SimpleButton text="View All" />
        </div>
        <div className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 grid grid-cols-3 gap-6">
          {mockFurnitureProducts
            .slice(0, 3)
            .map(({ id, title, price, image, badge, isDiscount }) => (
              <ProductCatalogCard
                key={id}
                id={id}
                badge={badge}
                image={image}
                price={price}
                title={title}
                isDiscount={isDiscount}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};
