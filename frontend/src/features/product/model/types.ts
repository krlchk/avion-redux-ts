import { Review } from "@/features/review/model/types";
import { ApiDecimal, PaginationMeta, SortOrder } from "@/shared/api/types";
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
  ids?: string[];
}

export interface ProductResponse {
  data: Product[];
  meta: PaginationMeta;
}

export type ProductSortBy = "createdAt" | "price";

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
  onResetPage: () => void;
}

export interface ProductFiltersProps {
  className?: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedDesigners: string[];
  onPriceRangeChange: (value: [number, number]) => void;
  onCategoriesChange: (values: string[]) => void;
  onDesignersChange: (values: string[]) => void;
  onResetPage: () => void;
}

export interface PriceSliderProps {
  priceRange: [number, number];
  onPriceRangeChange: ([value1, value2]: [number, number]) => void;
  onResetPage: () => void;
}

export type SortVariant = "latest" | "price-asc" | "price-desc" | "oldest";

export interface ProductCardItem {
  id: string;
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  badge: "new" | "sale" | undefined;
  isDiscount: boolean;
}

export interface ProductCatalogGridProps {
  onOpen: () => void;
  onSort: (value: SortVariant) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  selectedSort: SortVariant;
  startProduct: number;
  endProduct: number;
  totalProducts: number;
  totalFilters: number;
  isProductsLoading: boolean;
  gridProducts: ProductCardItem[];
  page: number;
  lastPage: number;
}

export interface BuildProductQueryParams {
  selectedSortConfig: { sortBy: ProductSortBy; sortOrder: SortOrder };
  catalogPage: number;
  searchTerm: string;
  selectedCategories: string[];
  selectedDesigners: string[];
  priceRange: [number, number];
}

export type SortQueryMapType = Record<
  SortVariant,
  { sortBy: ProductSortBy; sortOrder: SortOrder }
>;

export interface MapProductToCardItemParams {
  product: Product;
  now: Date;
}

export interface SortDropdownParams {
  selectedSort: SortVariant;
  onSort: (value: SortVariant) => void;
}

export interface ProductCategoriesProps {
  onCategorySelect: (id: string) => void;
}

export interface ProductMainCatalogProps {
  selectedCategories: string[];
  setSelectedCategories: (values: string[]) => void;
  catalogPage: number;
  setCatalogPage: (value: number) => void;
  searchTerm: string;
  resetCatalogPage: () => void;
}
