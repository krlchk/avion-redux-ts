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
    <Container className="mt-30">
      <div className="flex justify-between">
        <h2 className="text-5xl font-bold text-black">Shop by Categories</h2>
        <SimpleButton text="View all" />
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {isCategoriesLoading ? (
          <div className="col-span-4 flex min-h-52 items-center justify-center">
            <Loader />
          </div>
        ) : isCategoriesError ? (
          <div className="col-span-4 flex min-h-52 items-center justify-center text-center text-sm font-medium text-[#FB5454]">
            Failed to load categories
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-4 flex min-h-52 items-center justify-center text-center text-sm font-medium text-black/60">
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
