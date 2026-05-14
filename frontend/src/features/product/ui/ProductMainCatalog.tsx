"use client";

import { Container, Loader } from "@/shared/ui";
import { ChangeEvent, useMemo, useState } from "react";
import { ProductFiltersModalWindow } from "./filters/ProductFiltersModalWindow";
import { ProductFilters } from "./filters/ProductFilters";
import { ProductCatalogGrid } from "./catalog/ProductCatalogGrid";
import { SortVariant } from "../model/types";

import { useGetProductsQuery } from "@/store/services/productsApi";
import { sortQueryMap, PRODUCTS_PER_PAGE } from "../model/catalog.constants";
import {
  buildProductQuery,
  mapProductToCardItem,
} from "../model/product.utils";

export const ProductMainCatalog = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([99, 9999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortVariant>("latest");
  const [catalogPage, setCatalogPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const resetCatalogPage = () => setCatalogPage(1);

  const selectedSortConfig = sortQueryMap[selectedSort];

  const productQuery = buildProductQuery({
    selectedSortConfig,
    catalogPage,
    selectedCategories,
    selectedDesigners,
    priceRange,
  });

  const { data, isError, isLoading } = useGetProductsQuery(productQuery);

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

  if (isLoading) {
    return <Loader />;
  }

  if (!data) return null;

  const totalProducts = data.meta.total;
  const page = data.meta.page;
  const lastPage = data.meta.lastPage;

  const startProduct =
    totalProducts === 0 ? 0 : (page - 1) * PRODUCTS_PER_PAGE + 1;

  const endProduct = Math.min(page * PRODUCTS_PER_PAGE, totalProducts);

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

  const onPrevPage = () => {
    if (page > 1) {
      setCatalogPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < data.meta.lastPage) {
      setCatalogPage(page + 1);
    }
  };

  const onSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value as SortVariant);
    resetCatalogPage();
  };

  return (
    <div className={`bg-white ${isModalOpen && "overflow-hidden"}`}>
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
