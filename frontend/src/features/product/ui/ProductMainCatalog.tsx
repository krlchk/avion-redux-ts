"use client";

import { Container } from "@/shared/ui";
import { useState } from "react";
import { ProductFiltersModalWindow } from "./filters/ProductFiltersModalWindow";
import { ProductFilters } from "./filters/ProductFilters";
import { ProductCatalogGrid } from "./catalog/ProductCatalogGrid";
import { ProductQuery, SortVariant } from "../model/types";
import { defaultPriceRange } from "../model/constants";

export const ProductMainCatalog = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([99, 9999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortVariant>("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  const productQuery: ProductQuery = {};

  if (selectedCategories.length > 0)
    productQuery.categoryIds = selectedCategories;
  if (selectedDesigners.length > 0)
    productQuery.designerIds = selectedDesigners;
  if (defaultPriceRange[0] !== priceRange[0])
    productQuery.minPrice = priceRange[0];
  if (defaultPriceRange[1] !== priceRange[1])
    productQuery.maxPrice = priceRange[1];
  if (selectedSort === "latest") {
    productQuery.sortBy = "createdAt";
    productQuery.sortOrder = "desc";
  }
  if (selectedSort === "oldest") {
    productQuery.sortBy = "createdAt";
    productQuery.sortOrder = "asc";
  }
  if (selectedSort === "price-asc") {
    productQuery.sortBy = "price";
    productQuery.sortOrder = "asc";
  }
  if (selectedSort === "price-desc") {
    productQuery.sortBy = "price";
    productQuery.sortOrder = "desc";
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
          
        />
        <ProductCatalogGrid onOpen={onOpen} params={productQuery} onSortChange={setSelectedSort} selectedSort={selectedSort}/>
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
          />
        </ProductFiltersModalWindow>
      )}
    </div>
  );
};
