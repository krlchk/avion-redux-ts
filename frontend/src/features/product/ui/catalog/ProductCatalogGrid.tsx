import { ProductCatalogGridProps } from "../../model/types";
import { Loader, ProductCard } from "@/shared/ui";
import { SortDropdown } from "./SortDropdown";
import { getPaginationItems } from "../../model/product.utils";
import { ArrowLeft, ArrowRight } from "@/shared/icons";

export const ProductCatalogGrid = ({
  onOpen,
  onSort,
  onPrevPage,
  onNextPage,
  onPageChange,
  selectedSort,
  startProduct,
  endProduct,
  totalProducts,
  totalFilters,
  isProductsLoading,
  gridProducts,
  page,
  lastPage,
}: ProductCatalogGridProps) => {
  return (
    <div className="tablet:w-full mobile:w-full mobile:py-10 flex w-full flex-col py-16">
      <div className="mobile:flex-col mobile:items-stretch sticky top-0 z-20 flex w-full items-center justify-between gap-4 bg-[#f5f5f5]/85 py-4 font-medium text-black/60 backdrop-blur-xs">
        <p className="mobile:text-xl xs:text-base text-2xl">
          Showing {startProduct}-{endProduct} of {totalProducts} results
        </p>
        <div className="xs:flex-col relative flex justify-end gap-2">
          <SortDropdown onSort={onSort} selectedSort={selectedSort} />
          <div className="xs:w-full relative self-end">
            <button
              onClick={onOpen}
              className="mobile:text-base xs:w-full xs:px-4 flex items-center justify-center bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-[#f5f5f5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg active:translate-y-0"
            >
              Filters
            </button>
            {totalFilters > 0 && (
              <div className="pointer-events-none absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-[#f5f5f5] bg-[#ccab8f] px-1.5 text-sm font-bold text-[#f5f5f5] shadow-sm">
                {totalFilters}
              </div>
            )}
          </div>
        </div>
      </div>
      {isProductsLoading ? (
        <div className="mt-6 flex min-h-130 items-center justify-center">
          <Loader />
        </div>
      ) : gridProducts && gridProducts.length > 0 ? (
        <>
          <section className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 mt-6 grid grid-cols-3 gap-6">
            {gridProducts.map((product) => {
              return (
                <ProductCard
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
            {page > 1 ? (
              <button
                onClick={onPrevPage}
                className="group mobile:text-base flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 text-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
              >
                <ArrowLeft className="size-5 transition-colors group-hover:stroke-[#947458]" />
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center justify-center gap-2">
              {getPaginationItems(page, lastPage).map(
                (paginationItem, index) => {
                  if (typeof paginationItem === "string") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="mobile:text-base flex h-10 items-center px-1 text-xl font-bold text-black/40"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActivePage = paginationItem === page;

                  return (
                    <button
                      key={paginationItem}
                      type="button"
                      onClick={() => onPageChange(paginationItem)}
                      className={`mobile:text-base flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 text-xl font-bold transition-colors ${
                        isActivePage
                          ? "bg-[#947458] text-[#f5f5f5]"
                          : "text-black/60 hover:bg-[#947458] hover:text-[#f5f5f5]"
                      }`}
                    >
                      {paginationItem}
                    </button>
                  );
                },
              )}
            </div>

            {page < lastPage ? (
              <button
                onClick={onNextPage}
                className="group mobile:text-base flex h-10 min-w-10 cursor-pointer items-center justify-center border border-[#947458] px-3 text-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
              >
                <ArrowRight className="size-5 transition-colors group-hover:stroke-[#947458]" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </>
      ) : (
        <div className="mt-20 h-full text-center text-xl font-medium text-black">
          Product not found
        </div>
      )}
    </div>
  );
};
