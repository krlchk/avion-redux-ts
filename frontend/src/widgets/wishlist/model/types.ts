import type { Product } from "@/features/product/model/types";

export interface WishlistProductRowProps {
  onAddToCart: () => void;
  onRemove: () => void;
  product: Product;
}

export interface WishlistStatusMessageProps {
  isEmpty: boolean;
  isError: boolean;
  isLoading: boolean;
}
