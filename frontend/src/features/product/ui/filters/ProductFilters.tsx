"use client";

import "rc-slider/assets/index.css";
import { ProductCheckboxFilter } from "./ProductCheckboxFilter";
import { ProductFiltersProps } from "../../model/types";
import { Loader } from "@/shared/ui";
import { useGetDesignersQuery } from "@/store/services/usersApi";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { PriceSlider } from "./PriceSlider";
import { useMemo } from "react";

export const ProductFilters = ({
  className = "",
  priceRange,
  selectedCategories,
  selectedDesigners,
  onPriceRangeChange,
  onCategoriesChange,
  onDesignersChange,
  onResetPage
}: ProductFiltersProps) => {
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const {
    data: designersData,
    isLoading: isDesignersLoading,
    isError: isDesignersError,
  } = useGetDesignersQuery();

  const isFiltersLoading = isCategoriesLoading || isDesignersLoading;
  const isFiltersError = isCategoriesError || isDesignersError;

  const categories = categoriesData?.data;
  const designers = designersData?.data;

  const categoryFilterOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id,
        label: category.name,
        count: category.productsCount,
      })) ?? [],
    [categories],
  );

  const designerFilterOptions = useMemo(
    () =>
      designers?.map((designer) => ({
        value: designer.id,
        label: designer.name,
        count: designer.productsCount,
      })) ?? [],
    [designers],
  );

  const isFiltersEmpty =
    !isFiltersLoading &&
    !isFiltersError &&
    (categories?.length === 0 || designers?.length === 0);

  const isFiltersAvailable =
    !isFiltersLoading &&
    !isFiltersError &&
    Boolean(categories?.length) &&
    Boolean(designers?.length);

  return (
    <div
      className={`flex flex-col gap-10 text-2xl font-bold text-black ${className}`}
    >
      <div className="flex flex-col gap-5">
        <p>Filter by Price</p>
        <PriceSlider
          priceRange={priceRange}
          onPriceRangeChange={onPriceRangeChange}
          onResetPage={onResetPage}
        />
        <p className="text-xl">
          <span className="text-black/60">Price:</span> ${priceRange[0]} - $
          {priceRange[1]}
        </p>
      </div>
      <aside className="flex flex-col gap-10">
        {isFiltersLoading && (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}
        {isFiltersError && (
          <p className="py-5 text-center text-sm text-[#FB5454]">
            Failed to load filters
          </p>
        )}
        {isFiltersEmpty && (
          <p className="py-8 text-center text-sm text-black/60">
            No filters available
          </p>
        )}
        {isFiltersAvailable && (
          <>
            <ProductCheckboxFilter
              title="Filter by Categories"
              options={categoryFilterOptions}
              selectedValues={selectedCategories}
              onChange={onCategoriesChange}
              onResetPage={onResetPage}
            />
            <ProductCheckboxFilter
              title="Filter by Designer"
              options={designerFilterOptions}
              selectedValues={selectedDesigners}
              onChange={onDesignersChange}
              onResetPage={onResetPage}
            />
          </>
        )}
      </aside>
    </div>
  );
};
