import { ArrowDown } from "@/shared/icons";
import { ProductCatalogCard } from "./ProductCatalogCard";
import { ProductCatalogCardProps } from "../../model/types";

interface ProductCatalogGridProps {
  products: ProductCatalogCardProps[];
  onOpen: () => void;
}

export const ProductCatalogGrid = ({
  products,
  onOpen,
}: ProductCatalogGridProps) => {
  return (
    <div className="tablet:w-full mobile:w-full flex w-3/4 flex-col py-16 mobile:py-10">
      <div className="flex items-center justify-between gap-4 font-medium text-black/60 mobile:flex-col mobile:items-stretch">
        <p className="text-2xl mobile:text-xl xs:text-base">
          Showing 1-12 of 14 results
        </p>
        <div className="flex justify-end gap-2 xs:flex-col">
          <button
            onClick={onOpen}
            className="tablet:block mobile:block hidden self-end bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-white mobile:text-base xs:w-full xs:px-4"
          >
            Filters
          </button>
          <div className="relative flex shrink-0 items-center border border-[#947458] pr-3 pl-3 xs:w-full xs:pr-6">
            <select
              className="appearance-none bg-transparent pr-3 text-xl font-medium outline-none mobile:text-base xs:w-full xs:max-w-none xs:pr-6 xs:text-sm"
              name="category"
              id="category"
            >
              <option value="all">Sort by latest</option>
            </select>
            <ArrowDown />
          </div>
        </div>
      </div>
      <section className="mt-6 grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8">
        {products.map(({ id, title, price, image, badge }) => (
          <ProductCatalogCard
            key={id}
            id={id}
            badge={badge}
            image={image}
            price={price}
            title={title}
          />
        ))}
      </section>
      <div className="mx-auto mt-10 grid w-full grid-cols-3 items-center xs:grid-cols-2">
        <div />
        {/* pages */}
        <div className="flex justify-center xs:justify-start">
          <div className="flex h-10 w-10 items-center justify-center border border-[#947458] text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white mobile:text-base">
            1
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex h-10 items-center border border-[#947458] px-5 text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white mobile:text-base">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
