"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { categoryOptions, designerOptions } from "../../model/constants";
import { ProductCheckboxFilter } from "./ProductCheckboxFilter";
import { ProductFiltersProps } from "../../model/types";

export const ProductFilters = ({
  className = "",
  priceRange,
  selectedCategories,
  selectedDesigners,
  onPriceRangeChange,
  onCategoriesChange,
  onDesignersChange,
}: ProductFiltersProps) => {
  return (
    <div
      className={`flex flex-col gap-10 text-2xl font-bold text-black ${className}`}
    >
      <div className="flex flex-col gap-5">
        <p>Filter by Price</p>
        <Slider
          range
          min={99}
          max={9999}
          value={priceRange}
          onChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              onPriceRangeChange([value[0], value[1]]);
            }
          }}
          allowCross={false}
          styles={{
            rail: { backgroundColor: "#9A7B60", height: 4 },
            track: { backgroundColor: "#9A7B60", height: 4 },
            handle: {
              width: 20,
              height: 20,
              border: "4px solid #9A7B60",
              backgroundColor: "#fff",
              opacity: 1,
              marginTop: -8,
              boxShadow: "none",
            },
          }}
        />
        <p className="text-xl">
          <span className="text-black/60">Price:</span> ${priceRange[0]} - $
          {priceRange[1]}
        </p>
      </div>
      <aside className="flex flex-col gap-10">
        <ProductCheckboxFilter
          title="Filter by Categories"
          options={categoryOptions}
          selectedValues={selectedCategories}
          onChange={onCategoriesChange}
        />
        <ProductCheckboxFilter
          title="Filter by Designer"
          options={designerOptions}
          selectedValues={selectedDesigners}
          onChange={onDesignersChange}
        />
      </aside>
    </div>
  );
};
