import { Category } from "@/features/category/model/types";

export interface HomeCategory extends Category {
  image: string;
}

export interface HomeCategoriesProps {
  categories: HomeCategory[];
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
}

export interface HomeCategoryCardProps {
  category: HomeCategory;
}
