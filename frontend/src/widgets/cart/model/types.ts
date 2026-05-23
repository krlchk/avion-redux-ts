import type { Product } from "@/features/product/model/types";
import type { CartItem, CreateOrderItem } from "@/store/model/types";

export interface CartProductRowProps {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
  product: Product;
}

export interface CartStatusMessageProps {
  isEmpty: boolean;
  isError: boolean;
  isLoading: boolean;
}

export interface CartSummaryProps {
  isCheckoutDisabled: boolean;
  isPromoOpen: boolean;
  onPromoToggle: () => void;
  subtotal: string;
  checkoutProducts: CreateOrderItem[];
}
