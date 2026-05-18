"use client";

import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { useGetProductsQuery } from "@/store/services/productsApi";
import {
  HomeAboutUs,
  HomeBestsellers,
  HomeCategories,
  HomeHero,
  HomeProducts,
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
      <div className="tablet:flex-col mobile:flex-col flex w-full">
        <section className="tablet:w-full tablet:px-16 tablet:py-28 mobile:w-full mobile:gap-8 mobile:px-6 mobile:py-16 flex w-1/2 flex-col gap-16 bg-[#eeedec] px-32 py-52 text-black">
          <h2 className="mobile:text-3xl mobile:leading-10 text-4xl leading-13 font-bold">
            Affordable furniture for every home
          </h2>
          <p className="text-base leading-6.5 font-normal text-black/70">
            We curate pieces that balance price, durability, and style, making
            it easier to furnish every room without compromising on comfort or
            character.
          </p>
        </section>
        <div className="tablet:w-full tablet:min-h-150 mobile:w-full mobile:min-h-125 w-1/2 bg-[url('/images/home/review.jpg')] bg-cover bg-center" />
      </div>
    </section>
  );
};

export default Home;
