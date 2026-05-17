"use client";

import { mapProductToCardItem } from "@/features/product/model/product.utils";
import { Container, Loader } from "@/shared/ui";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { getHomeCategoryImage, HomeCategories } from "@/widgets/homeCategories";
import { HomeHero } from "@/widgets/homeHero";
import { useMemo, useState } from "react";
import { ProductCard } from "@/shared/ui/ProductCard";
import { skipToken } from "@reduxjs/toolkit/query";

const Home = () => {
  const { data, isError, isFetching, isLoading } = useGetProductsQuery();
  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
  } = useGetCategoriesQuery();
  const isHeroProductsLoading = isLoading || isFetching || !data;
  const heroProducts = data?.data.slice(0, 4) ?? [];
  const homeCategories =
    categoriesData?.data.map((category) => ({
      ...category,
      image: getHomeCategoryImage(category.name),
    })) ?? [];

  const now = useMemo(() => new Date(), []);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = homeCategories[activeCategoryIndex];

  const onNext = () => {
    if (homeCategories.length === 0) return;
    setActiveCategoryIndex((categoryIndex) =>
      categoryIndex === homeCategories.length - 1 ? 0 : categoryIndex + 1,
    );
  };
  const onPrev = () => {
    if (homeCategories.length === 0) return;
    setActiveCategoryIndex((categoryIndex) =>
      categoryIndex === 0 ? homeCategories.length - 1 : categoryIndex - 1,
    );
  };

  const activeCategoryProductsQuery = activeCategory
    ? {
        categoryIds: [activeCategory.id],
        limit: 3,
      }
    : skipToken;

  const {
    currentData: activeCategoryProductsData,
    isLoading: isActiveCategoryProductsLoading,
    isError: isActiveCategoryProductsError,
  } = useGetProductsQuery(activeCategoryProductsQuery);

  const activeCategoryProducts = useMemo(() => {
    if (!activeCategoryProductsData) return [];

    return activeCategoryProductsData.data.map((product) =>
      mapProductToCardItem({ product, now }),
    );
  }, [activeCategoryProductsData, now]);

  return (
    <section className="bg-[#F9F9F9]">
      <HomeHero
        heroProducts={heroProducts}
        isHeroProductsLoading={isHeroProductsLoading}
        isHeroProductsError={isError}
      />
      <HomeCategories
        categories={homeCategories}
        isCategoriesLoading={categoriesIsLoading}
        isCategoriesError={categoriesIsError}
      />
      <Container className="tablet:my-24 mobile:my-16 my-30 text-black">
        <h2 className="text-center text-5xl font-bold">Products</h2>
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            className="flex h-14 w-14 items-center justify-center rounded-full border"
          >
            Prev
          </button>
          <div className="mt-12 mb-10 flex justify-center gap-16">
            {homeCategories.map(({ id, name }, index) => (
              <button
                onClick={() => {
                  if (index === activeCategoryIndex) return;
                  setActiveCategoryIndex(index);
                }}
                className={`cursor-pointer border-b text-2xl font-medium transition-colors duration-300 hover:border-[#947458] ${
                  activeCategoryIndex === index
                    ? "border-[#947458]"
                    : "border-transparent text-black"
                }`}
                key={id}
              >
                {name}
              </button>
            ))}
          </div>
          <button
            onClick={onNext}
            className="flex h-14 w-14 items-center justify-center rounded-full border"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {isActiveCategoryProductsLoading ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center">
              <Loader />
            </div>
          ) : isActiveCategoryProductsError ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
              Failed to load products
            </div>
          ) : activeCategoryProducts.length === 0 ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-black/60">
              No products available
            </div>
          ) : (
            activeCategoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                oldPrice={product.oldPrice}
                badge={product.badge}
                isDiscount={product.isDiscount}
              />
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default Home;
