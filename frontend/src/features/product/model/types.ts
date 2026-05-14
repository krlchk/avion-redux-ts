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
  categoryIds?: string[];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  designerIds?: string[];
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
  setCatalogPage: (value: number) => void;
}

export interface ProductFiltersProps {
  className?: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedDesigners: string[];
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoriesChange: (values: string[]) => void;
  onDesignersChange: (values: string[]) => void;
  setCatalogPage: (value: number) => void;
}

export interface PriceSliderProps {
  priceRange: [number, number];
  onPriceRangeChange: ([value1, value2]: [number, number]) => void;
  setCatalogPage: (value: number) => void;
}

export type SortVariant = "latest" | "price-asc" | "price-desc" | "oldest";

export interface ProductCatalogGridProps {
  onOpen: () => void;
  params: ProductQuery;
  onSortChange: (value: SortVariant) => void;
  selectedSort: SortVariant;
  setCatalogPage: (value: number) => void;
}
