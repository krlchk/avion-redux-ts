import { Order } from "@/features/order/model/types";
import { baseApi } from "./baseApi";

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  promoCode?: string;
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
