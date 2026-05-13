import { Review } from "@/features/review/model/types";
import { ApiDecimal, PaginationMeta, SortOrder } from "@/features/types/api";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  description: string;
  img: string;
  price: ApiDecimal;
  stock: number;
  width: number;
  height: number;
  depth: number;
  designerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  discountPercent: number | null;
  discountUntil: string | null;
  reviews: Review[];
  finalPrice: number;
  reviewsCount: number;
  averageRating: number;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  designerId?: string;
}

export interface ProductResponse {
  data: Product[];
  meta: PaginationMeta;
}

export type ProductSortBy = "createdAt" | "price";

export interface ProductCatalogCardProps {
  id?: string;
  title: string;
  image: string | StaticImageData | null;
  price: string;
  oldPrice?: string;
  badge?: "new" | "sale";
  isDiscount?: boolean;
}

export interface ProductFiltersModalWindowProps {
  onClose: () => void;
  isClosing: boolean;
  children: ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ProductCheckboxFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export interface ProductFiltersProps {
  className?: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedDesigners: string[];
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoriesChange: (values: string[]) => void;
  onDesignersChange: (values: string[]) => void;
}

export interface PriceSliderProps {
  priceRange: [number, number];
  onPriceRangeChange: ([value1, value2]: [number, number]) => void;
}

export interface ProductCatalogGridProps {
  onOpen: () => void;
}
