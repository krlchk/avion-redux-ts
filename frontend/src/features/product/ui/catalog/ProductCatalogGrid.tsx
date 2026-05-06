import { ArrowDown } from "@/shared/icons";
import { ProductCatalogCard } from "./ProductCatalogCard";
import { ProductCatalogCardProps } from "../../model/types";
import { SimpleButton } from "@/shared/ui";

interface ProductCatalogGridProps {
  products: ProductCatalogCardProps[];
  onOpen: () => void;
}

export const ProductCatalogGrid = ({
  products,
  onOpen,
}: ProductCatalogGridProps) => {
  return (
    <div className="tablet:w-full mobile:w-full mobile:py-10 flex w-3/4 flex-col py-16">
      <div className="mobile:flex-col mobile:items-stretch flex items-center justify-between gap-4 font-medium text-black/60">
        <p className="mobile:text-xl xs:text-base text-2xl">
          Showing 1-12 of 14 results
        </p>
        <div className="xs:flex-col flex justify-end gap-2">
          <button
            onClick={onOpen}
            className="tablet:block mobile:block mobile:text-base xs:w-full xs:px-4 hidden self-end bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-white"
          >
            Filters
          </button>
          <div className="xs:w-full xs:pr-6 relative flex shrink-0 items-center border border-[#947458] pr-3 pl-3">
            <select
              className="mobile:text-base xs:w-full xs:max-w-none xs:pr-6 xs:text-sm appearance-none bg-transparent pr-3 text-xl font-medium outline-none"
              name="category"
              id="category"
            >
              <option value="all">Sort by latest</option>
            </select>
            <ArrowDown />
          </div>
        </div>
      </div>
      <section className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 mt-6 grid grid-cols-3 gap-6">
        {products.map(({ id, title, price, image, badge, isDiscount }) => (
          <ProductCatalogCard
            key={id}
            badge={badge}
            image={image}
            price={price}
            title={title}
            isDiscount={isDiscount}
          />
        ))}
      </section>
      <div className="xs:grid-cols-2 mx-auto mt-10 grid w-full grid-cols-3 items-center">
        <div />
        {/* pages */}
        <div className="xs:justify-start flex justify-center">
          <div className="mobile:text-base flex h-10 w-10 items-center justify-center border border-[#947458] text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white">
            1
          </div>
        </div>

        <div className="flex justify-end">
          <SimpleButton text="Next" />
        </div>
      </div>
    </div>
  );
};
