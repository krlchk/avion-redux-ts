"use client";

import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { useGetProductsQuery } from "@/store/services/productsApi";
import {
  HomeAboutUs,
  HomeBestsellers,
  HomeCategories,
  HomeHero,
  HomeProducts,
  HomeReviews,
} from "@/widgets/home";
import { getHomeCategoryImage } from "@/widgets/home/homeCategories";

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

  return (
    <section className="bg-[#f5f5f5]">
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

      <HomeProducts categories={homeCategories} />
      <HomeAboutUs />
      <HomeBestsellers />
      <HomeReviews />
    </section>
  );
};

export default Home;
