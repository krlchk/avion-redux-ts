import { Loader, ProductCard } from "@/shared/ui";
import { AnimatePresence, motion } from "motion/react";
import { HomeProductsSliderProps } from "../model/types";

export const HomeProductsSlider = ({
  slideDirection,
  activeCategoryId,
  products,
  isLoading,
  isError,
  onMouseEnter,
  onMouseLeave,
}: HomeProductsSliderProps) => {
  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategoryId ?? "empty-category"}
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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-8 grid grid-cols-3 gap-6"
        >
          {isLoading ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center">
              <Loader />
            </div>
          ) : isError ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
              Failed to load products
            </div>
          ) : products.length === 0 ? (
            <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-black/60">
              No products available
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
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
  );
};
