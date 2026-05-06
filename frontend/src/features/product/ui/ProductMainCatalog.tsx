"use client";

import { Container } from "@/shared/ui";
import { useState } from "react";
import { ProductFiltersModalWindow } from "./filters/ProductFiltersModalWindow";
import { ProductFilters } from "./filters/ProductFilters";
import { ProductCatalogGrid } from "./catalog/ProductCatalogGrid";

export const ProductMainCatalog = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([99, 9999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

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
        <ProductCatalogGrid onOpen={onOpen} />
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
