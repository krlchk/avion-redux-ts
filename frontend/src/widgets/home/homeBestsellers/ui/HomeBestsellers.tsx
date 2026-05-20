import { mapProductToCardItem } from "@/features/product/model/product.utils";
import { Container, Loader, ProductCard, SimpleButton } from "@/shared/ui";
import { useGetProductsQuery } from "@/store/services/productsApi";
import Link from "next/link";
import { useMemo } from "react";

export const HomeBestsellers = () => {
  const { data, isError, isLoading } = useGetProductsQuery({
    page: 6,
  });
  const now = useMemo(() => new Date(), []);

  const bestsellersHome = useMemo(() => {
    if (!data) return [];

    return data.data.map((product) => mapProductToCardItem({ product, now }));
  }, [data, now]);

  return (
    <Container className="tablet:py-24 mobile:py-16 py-30">
      <div className="mobile:flex-col mobile:items-start mobile:gap-5 flex items-center justify-between gap-6">
        <h2 className="tablet:text-4xl mobile:text-4xl xs:text-3xl text-5xl font-bold text-black">
          Bestsellers
        </h2>
        <Link href={`/products`}>
          <SimpleButton text="View all" />
        </Link>
      </div>
      <div className="tablet:grid-cols-2 mobile:grid-cols-2 xs:grid-cols-1 mt-10 grid grid-cols-3 gap-6">
        {isLoading ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
            Failed to load bestsellers
          </div>
        ) : bestsellersHome.length === 0 ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-black/60">
            No bestsellers available
          </div>
        ) : (
          bestsellersHome.map((product) => (
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
  );
};
