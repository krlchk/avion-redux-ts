import { ApiDecimal } from "@/shared/api/types";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: ApiDecimal;
}

type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

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
}
