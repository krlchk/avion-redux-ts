"use client";

import { Container, Loader } from "@/shared/ui";
import { useMemo, useState } from "react";
import { ProductMainCatalogProps, SortVariant } from "../model/types";

import { useGetProductsQuery } from "@/store/services/productsApi";
import { sortQueryMap, PRODUCTS_PER_PAGE } from "../model/catalog.constants";
import {
  buildProductQuery,
  mapProductToCardItem,
} from "../model/product.utils";
import { ProductFilters, ProductFiltersModalWindow } from "./filters";
import { ProductCatalogGrid } from "./catalog";

export const ProductMainCatalog = ({
  selectedCategories,
  setSelectedCategories,
  catalogPage,
  setCatalogPage,
  searchTerm,
  resetCatalogPage,
}: ProductMainCatalogProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 2000]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortVariant>("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const selectedSortConfig = sortQueryMap[selectedSort];

  const productQuery = buildProductQuery({
    selectedSortConfig,
    catalogPage,
    searchTerm,
    selectedCategories,
    selectedDesigners,
    priceRange,
  });

  const {
    currentData: data,
    isError,
    isFetching,
    isLoading,
  } = useGetProductsQuery(productQuery);

  const now = useMemo(() => new Date(), []);

  const gridProducts = useMemo(() => {
    if (!data) return [];

    return data.data.map((product) => mapProductToCardItem({ product, now }));
  }, [data, now]);

  if (isError) {
    return (
      <Container className="py-5 text-center text-sm text-[#FB5454]">
        Failed to load filters
      </Container>
    );
  }

  const onClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
    }, 300);
  };

  const onOpen = () => {
    setIsModalOpen(true);
    setIsModalClosing(false);
  };

  const isProductsLoading = isLoading || isFetching || !data;
  const totalProducts = data?.meta.total ?? 0;
  const page = data?.meta.page ?? catalogPage;
  const lastPage = data?.meta.lastPage ?? 1;

  const startProduct =
    totalProducts === 0 ? 0 : (page - 1) * PRODUCTS_PER_PAGE + 1;

  const endProduct = Math.min(page * PRODUCTS_PER_PAGE, totalProducts);

  const onPrevPage = () => {
    if (page > 1) {
      setCatalogPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < lastPage) {
      setCatalogPage(page + 1);
    }
  };

  const onSort = (value: SortVariant) => {
    setSelectedSort(value);
    resetCatalogPage();
  };

  return (
    <div className={`bg-[#f5f5f5] ${isModalOpen && "overflow-hidden"}`}>
      <Container className="flex gap-6">
        <ProductFilters
          className="tablet:hidden mobile:hidden w-1/4 py-16"
          priceRange={priceRange}
          selectedCategories={selectedCategories}
          selectedDesigners={selectedDesigners}
          onPriceRangeChange={setPriceRange}
          onCategoriesChange={setSelectedCategories}
          onDesignersChange={setSelectedDesigners}
          onResetPage={resetCatalogPage}
        />
        {isProductsLoading ? (
          <div className="tablet:w-full mobile:w-full mobile:py-10 flex w-3/4 items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <ProductCatalogGrid
            onOpen={onOpen}
            onSort={onSort}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            selectedSort={selectedSort}
            startProduct={startProduct}
            endProduct={endProduct}
            totalProducts={totalProducts}
            gridProducts={gridProducts}
            page={page}
            lastPage={lastPage}
          />
        )}
      </Container>

      {isModalOpen && (
        <ProductFiltersModalWindow isClosing={isModalClosing} onClose={onClose}>
          <ProductFilters
            className="px-6 py-10"
            priceRange={priceRange}
            selectedCategories={selectedCategories}
            selectedDesigners={selectedDesigners}
            onPriceRangeChange={setPriceRange}
            onCategoriesChange={setSelectedCategories}
            onDesignersChange={setSelectedDesigners}
            onResetPage={resetCatalogPage}
          />
        </ProductFiltersModalWindow>
      )}
    </div>
  );
};
