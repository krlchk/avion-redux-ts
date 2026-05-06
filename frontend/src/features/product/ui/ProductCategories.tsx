"use client";

import { Container, Loader } from "@/shared/ui";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { getCategoryIcon } from "@/features/category/model/constants";

export const ProductCategories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError)
    return (
      <Container className="py-5 text-center text-sm text-[#FB5454]">
        Failed to load categories
      </Container>
    );

  if (!data) return null;

  const categories = data.data;

  if (categories.length === 0) {
    return (
      <Container className="py-8 text-center text-sm text-black/60">
        No categories available
      </Container>
    );
  }

  return (
    <Container className="flex items-center justify-center py-8">
      <div className="mobile:grid-cols-2 mobile:gap-8 xs:grid-cols-1 tablet:grid-cols-4 grid w-full grid-cols-5 gap-10">
        {categories.map(({ id, name, productsCount }) => {
          const Icon = getCategoryIcon(name);
          return (
            <div
              key={id}
              className="mobile:justify-start group tablet:justify-start flex min-w-0 cursor-pointer items-center justify-center gap-5"
            >
              <Icon className="shrink-0" />
              <div className="font-bold text-black">
                <p className="mobile:text-lg xs:text-base text-xl transition-all group-hover:text-[#947458]">
                  {name}
                </p>
                <p className="xs:text-xs text-sm text-black/60">
                  {productsCount} products
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
