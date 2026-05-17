"use client";

import { useGetProductsQuery } from "@/store/services/productsApi";
import { HomeHero } from "@/widgets/homeHero";

const Home = () => {
  const { data, isError, isFetching, isLoading } = useGetProductsQuery();
  const isHeroProductsLoading = isLoading || isFetching || !data;
  const heroProducts = data?.data.slice(0, 4) ?? [];

  return (
    <section className="bg-[#F9F9F9]">
      <HomeHero
        heroProducts={heroProducts}
        isHeroProductsLoading={isHeroProductsLoading}
        isHeroProductsError={isError}
      />
    </section>
  );
};

export default Home;
