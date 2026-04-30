import { Review } from "@/features/review/model/types";
import { ApiDecimal, PaginationMeta, SortOrder } from "@/features/types/api";

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
