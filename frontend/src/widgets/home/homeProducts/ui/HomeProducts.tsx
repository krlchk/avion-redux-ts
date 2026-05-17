import { mapProductToCardItem } from "@/features/product/model/product.utils";
import { ArrowLeft, ArrowRight } from "@/shared/icons";
import { Container, Loader } from "@/shared/ui";
import { ProductCard } from "@/shared/ui/ProductCard";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { HomeProductsProps } from "../model/types";

export const HomeProducts = ({ categories }: HomeProductsProps) => {
  const now = useMemo(() => new Date(), []);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const activeCategory = categories[activeCategoryIndex];

  const onNext = () => {
    if (categories.length === 0) return;
    setSlideDirection("next");
    setActiveCategoryIndex((categoryIndex) =>
      categoryIndex === categories.length - 1 ? 0 : categoryIndex + 1,
    );
  };

  const onPrev = () => {
    if (categories.length === 0) return;
    setSlideDirection("prev");
    setActiveCategoryIndex((categoryIndex) =>
      categoryIndex === 0 ? categories.length - 1 : categoryIndex - 1,
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
    <Container className="tablet:py-24 mobile:py-16 py-30 text-black">
      <h2 className="tablet:text-4xl mobile:text-4xl xs:text-3xl text-center text-5xl font-bold">
        Products
      </h2>
      <div className="mobile:mt-8 mobile:flex-wrap mobile:justify-center mobile:gap-4 mt-12 mb-10 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="group mobile:order-2 mobile:h-12 mobile:w-12 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/30 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
        >
          <ArrowLeft className="size-7 transition-colors group-hover:stroke-[#947458]" />
        </button>
        <div className="mobile:order-1 mobile:w-full mobile:gap-8 mobile:overflow-x-auto mobile:pb-2 xs:gap-6 mobile:justify-center flex justify-center gap-16">
          {categories.map(({ id, name }, index) => (
            <button
              onClick={() => {
                if (index === activeCategoryIndex) return;
                setSlideDirection(
                  index > activeCategoryIndex ? "next" : "prev",
                );
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
          className="group mobile:order-3 mobile:h-12 mobile:w-12 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/30 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:shadow-lg active:translate-y-0"
        >
          <ArrowRight className="size-7 transition-colors group-hover:stroke-[#947458]" />
        </button>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory?.id ?? "empty-category"}
            initial={{
              opacity: 0,
              x: slideDirection === "next" ? 64 : -64,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: slideDirection === "next" ? -64 : 64,
            }}
            transition={{ duration: 0.36, ease: "easeOut" }}
            className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 grid grid-cols-3 gap-6"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};
