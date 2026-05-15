"use client";

import { ProductCategories } from "./ProductCategories";
import { ProductBenefits } from "./ProductBenefits";
import { ProductMainCatalog } from "./ProductMainCatalog";
import { ProductFeature } from "./ProductFeature";
import { useState } from "react";

export const ProductCatalog = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [catalogPage, setCatalogPage] = useState(1);

  const resetCatalogPage = () => setCatalogPage(1);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories([categoryId]);
    resetCatalogPage();
  };
  return (
    <section className="bg-[#F9F9F9]">
      <ProductCategories onCategorySelect={handleCategorySelect} />
      <ProductMainCatalog
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        catalogPage={catalogPage}
        setCatalogPage={setCatalogPage}
        resetCatalogPage={resetCatalogPage}
      />
      <ProductBenefits />
      <ProductFeature />
    </section>
  );
};
