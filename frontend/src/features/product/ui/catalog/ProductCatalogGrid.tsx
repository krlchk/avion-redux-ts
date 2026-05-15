import { ArrowDown } from "@/shared/icons";
import { ProductCatalogCard } from "./ProductCatalogCard";
import {
  ProductCatalogGridProps,
  SortDropdownParams,
  SortVariant,
} from "../../model/types";
import { SimpleButton } from "@/shared/ui";
import { sortOptions } from "../../model/catalog.constants";
import { useEffect, useRef, useState } from "react";

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
          <SortDropdown onSort={onSort} selectedSort={selectedSort} />
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

const SortDropdown = ({ selectedSort, onSort }: SortDropdownParams) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedSortOption = sortOptions.find(
    (option) => option.value === selectedSort,
  );

  const handleSortSelect = (value: SortVariant) => {
    onSort(value);
    setIsSortOpen(false);
  };
  return (
    <div ref={sortDropdownRef} className="xs:w-full relative min-w-65 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isSortOpen}
        onClick={() => setIsSortOpen((previousValue) => !previousValue)}
        className="mobile:text-base xs:w-full flex w-full cursor-pointer items-center justify-between border border-[#947458] bg-white px-4 py-2 text-xl font-medium text-black/70 transition-colors hover:border-[#7f6249]"
      >
        <span className="truncate">
          {selectedSortOption?.title ?? "Sort by latest"}
        </span>
        <ArrowDown
          className={`shrink-0 transition-transform duration-200 ${
            isSortOpen ? "rotate-180" : ""
          }`}
          stroke="#947458"
        />
      </button>

      {isSortOpen && (
        <div className="absolute top-full right-0 z-20 mt-2 w-full overflow-hidden border border-[#947458] bg-white p-2">
          <ul role="listbox" className="flex flex-col gap-1">
            {sortOptions.map(({ value, title }) => {
              const isSelected = value === selectedSort;

              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => handleSortSelect(value as SortVariant)}
                    className={`mobile:text-base flex w-full items-center rounded-xl px-4 py-3 text-left text-xl font-medium transition-colors ${
                      isSelected
                        ? "bg-[#947458] text-white"
                        : "text-black/70 hover:bg-[#F6F4F2]"
                    }`}
                  >
                    {title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
