"use client";

import { Container, Loader } from "@/shared/ui";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { useMemo } from "react";
import { mapProductToCardItem } from "../model/product.utils";
import { ProductCard } from "@/shared/ui/ProductCard";

export const ProductFeature = () => {
  const { data, isError, isLoading } = useGetProductsQuery();
  const now = useMemo(() => new Date(), []);

  const featuredProducts = useMemo(() => {
    if (!data) return [];

    return data.data
      .map((product) => mapProductToCardItem({ product, now }))
      .slice(0, 3);
  }, [data, now]);

  if (isError) {
    return (
      <Container className="py-5 text-center text-sm text-[#FB5454]">
        Failed to load filters
      </Container>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) return null;

  return (
    <div className="tablet:px-0 mobile:px-0 bg-white px-32">
      <Container className="tablet:py-20 mobile:gap-8 mobile:py-14 flex flex-col gap-12 py-28">
        <div className="mobile:flex-col mobile:items-start flex items-center justify-between gap-4">
          <p className="tablet:text-4xl mobile:text-3xl xs:text-2xl text-5xl font-bold text-black">
            Featured Products
          </p>
        </div>
        <div className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 grid grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              badge={product.badge}
              isDiscount={product.isDiscount}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
