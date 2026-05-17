import { Container, Loader, SimpleButton } from "@/shared/ui";
import { HomeCategoriesProps } from "../model/types";
import { HomeCategoryCard } from "./HomeCategoryCard";
import Link from "next/link";

export const HomeCategories = ({
  categories,
  isCategoriesLoading,
  isCategoriesError,
}: HomeCategoriesProps) => {
  return (
    <Container className="tablet:my-24 mobile:my-16 my-30">
      <div className="mobile:flex-col mobile:items-start mobile:gap-5 flex items-center justify-between gap-6">
        <h2 className="tablet:text-4xl mobile:text-4xl xs:text-3xl text-5xl font-bold text-black">
          Shop by Categories
        </h2>
        <SimpleButton text="View all" />
      </div>
      <div className="tablet:grid-cols-2 mobile:grid-cols-2 xs:grid-cols-1 mt-10 grid grid-cols-3 gap-6">
        {isCategoriesLoading ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center">
            <Loader />
          </div>
        ) : isCategoriesError ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
            Failed to load categories
          </div>
        ) : categories.length === 0 ? (
          <div className="tablet:col-span-2 mobile:col-span-2 xs:col-span-1 col-span-3 flex min-h-52 items-center justify-center text-center text-sm font-medium text-black/60">
            No categories available
          </div>
        ) : (
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
            >
              <HomeCategoryCard category={category} />
            </Link>
          ))
        )}
      </div>
    </Container>
  );
};
