import { ApiDecimal } from "@/shared/api/types";
import type { User } from "@/features/user/model/types";

export interface OrderItemProduct {
  id: string;
  title: string;
  img: string;
  price: ApiDecimal;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: ApiDecimal;
  product?: OrderItemProduct;
}

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";
export type PromoCodeType = "PERCENT" | "FIXED";

export interface PromoCode {
  id: string;
  code: string;
  title: string | null;
  type: PromoCodeType;
  value: ApiDecimal;
  isActive: boolean;
  expiresAt: string | null;
  maxUses: number | null;
  usedCount: number;
  createdAt: string;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  userId: string | null;
  items: OrderItem[];
  totalPrice: ApiDecimal;
  paymentIntentId: string | null;
  currency: string;
  paidAt: string | null;
  subtotalPrice: ApiDecimal | null;
  totalPriceWithoutPromoCodesDiscounts: ApiDecimal | null;
  promoDiscountAmount: ApiDecimal;
  promoCodeId: string | null;
  promoCode?: PromoCode | null;
  user?: User | null;
}

export interface OrdersResponse {
  data: Order[];
}

export interface OrdersRequest {
  status?: OrderStatus;
}
