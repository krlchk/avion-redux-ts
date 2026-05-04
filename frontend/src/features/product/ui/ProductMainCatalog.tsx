"use client";

import { Container } from "@/shared/ui";
import { useState } from "react";
import { ProductFiltersModalWindow } from "./ProducFiltersModalWindow";
import { ProductFilters } from "./ProductFilters";

// type CatalogFilters = {
//   priceRange: [number, number];
//   designerIds: string[];
//   categoriesIds: string[];
//   isStock?: boolean;
// };

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
      <Container className="flex">
        <ProductFilters
          className="tablet:hidden mobile:hidden w-1/4 py-16"
          priceRange={priceRange}
          selectedCategories={selectedCategories}
          selectedDesigners={selectedDesigners}
          onPriceRangeChange={setPriceRange}
          onCategoriesChange={setSelectedCategories}
          onDesignersChange={setSelectedDesigners}
        />
        <div className="tablet:w-full mobile:w-full flex w-3/4 flex-col">
          <button
            onClick={onOpen}
            className="tablet:block mobile:block hidden w-1/5 self-end bg-[#947458] px-14 py-2 text-xl font-medium whitespace-nowrap text-white"
          >
            Filters
          </button>
        </div>
      </Container>

      {isModalOpen && (
        <ProductFiltersModalWindow
          isClosing={isModalClosing}
          onClose={onClose}
        >
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
