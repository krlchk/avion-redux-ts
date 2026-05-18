import { ProductCardProps } from "@/shared/model/types";
import { HomeCategory } from "../../homeCategories";

export interface HomeProductsProps {
  categories: HomeCategory[];
}

export interface HomeProductCardItem extends ProductCardProps {
  id: string;
}

export interface HomeProductsSliderProps {
  slideDirection: "next" | "prev";
  activeCategoryId?: string;
  products: HomeProductCardItem[];
  isLoading: boolean;
  isError: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
