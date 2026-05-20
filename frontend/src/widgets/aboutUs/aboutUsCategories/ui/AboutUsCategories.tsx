"use client";

import { Container, Loader } from "@/shared/ui";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { AboutUsCategoryStatCard } from "./AboutUsCategoryStatCard";

export const AboutUsCategories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-8">
        <Loader />
      </Container>
    );
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
    <Container className="tablet:py-16 mobile:py-14 flex flex-col gap-12 py-20 text-black">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <h2 className="tablet:text-4xl tablet:leading-12 mobile:text-3xl mobile:leading-10 text-5xl leading-16.25 font-bold">
          Curated for every room
        </h2>
        <p className="text-base leading-7 font-normal text-black/60">
          From generous sofas to quiet decorative details, our categories are
          built to help you shape a home that feels considered, comfortable and
          easy to live in.
        </p>
      </div>
      <div className="tablet:grid-cols-3 mobile:grid-cols-2 xs:grid-cols-1 grid w-full grid-cols-5 gap-5">
        {categories.map((category) => (
          <AboutUsCategoryStatCard key={category.id} category={category} />
        ))}
      </div>
    </Container>
  );
};
