"use client";

import { ProductCategories } from "./ProductCategories";
import { ProductBenefits } from "./ProductBenefits";
import { ProductMainCatalog } from "./ProductMainCatalog";
import { ProductFeature } from "./ProductFeature";
import { useState } from "react";

export interface ProductCatalogProps {
  initialSearchTerm: string;
  initialCategoryId: string;
}

export const ProductCatalog = ({
  initialCategoryId,
  initialSearchTerm,
}: ProductCatalogProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategoryId ? [initialCategoryId] : [],
  );
  const [searchTerm] = useState(initialSearchTerm);
  const [catalogPage, setCatalogPage] = useState(1);

  const resetCatalogPage = () => setCatalogPage(1);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories([categoryId]);
    resetCatalogPage();
  };

  return (
    <section className="bg-[#f5f5f5]">
      <ProductCategories onCategorySelect={handleCategorySelect} />
      <ProductMainCatalog
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        catalogPage={catalogPage}
        setCatalogPage={setCatalogPage}
        searchTerm={searchTerm}
        resetCatalogPage={resetCatalogPage}
      />
      <ProductBenefits />
      <ProductFeature />
    </section>
  );
};
