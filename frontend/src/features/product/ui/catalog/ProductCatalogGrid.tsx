import { ArrowDown } from "@/shared/icons";
import { ProductCatalogCard } from "./ProductCatalogCard";
import { ProductCatalogGridProps } from "../../model/types";
import { SimpleButton } from "@/shared/ui";
import { sortOptions } from "../../model/catalog.constants";

export const ProductCatalogGrid = ({
  onOpen,
  onSort,
  onPrevPage,
  onNextPage,
  selectedSort,
  startProduct,
  endProduct,
  totalProducts,
  gridProducts,
  page,
  lastPage,
}: ProductCatalogGridProps) => {
  return (
    <div className="tablet:w-full mobile:w-full mobile:py-10 flex w-3/4 flex-col py-16">
      <div className="mobile:flex-col mobile:items-stretch flex items-center justify-between gap-4 font-medium text-black/60">
        <p className="mobile:text-xl xs:text-base text-2xl">
          Showing {startProduct}-{endProduct} of {totalProducts} results
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
              value={selectedSort}
              onChange={onSort}
              className="mobile:text-base xs:w-full xs:max-w-none xs:pr-6 xs:text-sm appearance-none bg-transparent pr-3 text-xl font-medium outline-none"
              name="sort"
              id="sort"
            >
              {sortOptions.map(({ value, title }) => (
                <option key={value} value={value}>
                  {title}
                </option>
              ))}
            </select>
            <ArrowDown />
          </div>
        </div>
      </div>
      <section className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 mt-6 grid grid-cols-3 gap-6">
        {gridProducts.map((product) => {
          return (
            <ProductCatalogCard
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              badge={product.badge}
              isDiscount={product.isDiscount}
            />
          );
        })}
      </section>
      <div className="mt-16 flex justify-between">
        {page > 1 ? <SimpleButton onClick={onPrevPage} text="Prev" /> : <div />}

        <div className="mobile:text-base flex h-10 w-10 items-center justify-center border border-[#947458] text-xl font-bold text-black/60 transition-colors hover:bg-[#947458] hover:text-white">
          {page}
        </div>

        {page < lastPage ? (
          <SimpleButton onClick={onNextPage} text="Next" />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
